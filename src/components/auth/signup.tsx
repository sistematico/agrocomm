// 'use client'

// import Form from 'next/form'
// import { signUp } from '@/actions'
// import { useActionState } from 'react'
// import { FormState } from '@/types'

// export default function SignupForm() {
//   const [state, action, pending] = useActionState<FormState, FormData>(
//     signUp,
//     undefined
//   )

//   return (
//     // <form action={action}>
//     //   <div>
//     //     <label htmlFor="name">Name</label>
//     //     <input id="name" name="name" placeholder="Name" />
//     //   </div>
//     //   {state?.errors?.name && <p>{state.errors.name}</p>}

//     //   <div>
//     //     <label htmlFor="email">Email</label>
//     //     <input id="email" name="email" placeholder="Email" />
//     //   </div>
//     //   {state?.errors?.email && <p>{state.errors.email}</p>}

//     //   <div>
//     //     <label htmlFor="password">Password</label>
//     //     <input id="password" name="password" type="password" />
//     //   </div>
//     //   {state?.errors?.password && (
//     //     <div>
//     //       <p>Password must:</p>
//     //       <ul>
//     //         {state.errors.password.map((error) => (
//     //           <li key={error}>- {error}</li>
//     //         ))}
//     //       </ul>
//     //     </div>
//     //   )}
//     //   <button disabled={pending} type="submit">
//     //     Sign Up
//     //   </button>
//     // </form>

//     <Form className="space-y-6" action={action}>
//       <div className="flex gap-4">
//         <div className="w-full">
//           <label htmlFor="name" className="block font-medium">
//             Nome
//           </label>
//           <div className="mt-2">
//             <input
//               type="text"
//               name="name"
//               id="name"
//               className="block w-full rounded-md bg-black/10 border-2 border-black/20 px-3 py-1.5 placeholder:text-gray-400 sm:text-sm/6 focus:outline-none"
//             />
//           </div>
//         </div>

//         <div className="w-full">
//           <label htmlFor="email" className="block font-medium">
//             Email
//           </label>
//           <div className="mt-2">
//             <input
//               type="email"
//               name="email"
//               id="email"
//               autoComplete="email"
//               required
//               className="block w-full rounded-md bg-black/10 border-2 border-black/20 px-3 py-1.5 placeholder:text-gray-400 sm:text-sm/6 focus:outline-none"
//             />
//           </div>
//           {state?.errors?.email && <p>{state.errors.email}</p>}
//         </div>
//       </div>

//       <div>
//         <div className="flex items-center justify-between">
//           <label htmlFor="password" className="block font-medium">
//             Senha
//           </label>
//         </div>
//         <div className="mt-2">
//           <input
//             type="password"
//             name="password"
//             id="password"
//             autoComplete="current-password"
//             required
//             className="block w-full rounded-md bg-black/10 border-2 border-black/20 px-3 py-1.5 placeholder:text-gray-400 sm:text-sm/6 focus:outline-none"
//           />
//         </div>
//       </div>

//       <div>
//         <div className="flex items-center justify-between">
//           <label htmlFor="password2" className="block font-medium">
//             Repita a Senha
//           </label>
//         </div>
//         <div className="mt-2">
//           <input
//             type="password"
//             name="password2"
//             id="password2"
//             autoComplete="current-password"
//             required
//             className="block w-full rounded-md bg-black/10 border-2 border-black/20 px-3 py-1.5 placeholder:text-gray-400 sm:text-sm/6 focus:outline-none"
//           />
//         </div>
//       </div>

//       {state?.errors?.password && (
//         <div>
//           <p>Password must:</p>
//           <ul>
//             {state.errors.password.map((error) => (
//               <li key={error}>- {error}</li>
//             ))}
//           </ul>
//         </div>
//       )}

//       <div>
//         <button
//           type="submit"
//           className="cursor-pointer bg-green-700 text-white px-5 py-2 rounded-md hover:bg-green-800 transition-colors"
//           disabled={pending}
//         >
//           Cadastrar
//         </button>
//       </div>
//     </Form>
//   )
// }


"use client";

import { useState } from "react";
import { signUp } from "@/actions";
import { z } from "zod";
import { signUpSchema } from "@/schemas/auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
// import { PasswordStrength } from "@/components/ui/password-strength";
import { InputPassword } from "@/components/ui/password";
import Link from "next/link";

type FormData = z.infer<typeof signUpSchema>;

export function SignUpForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [submitError, setSubmitError] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);

  function validateEmail(email: string): string | undefined {
    if (!email) return "Email é obrigatório";
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Email inválido. Exemplo: usuario@dominio.com";
    }
    
    return undefined;
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Validação em tempo real para email
    if (name === "email" && emailTouched) {
      const emailError = validateEmail(value);
      setErrors({ ...errors, email: emailError });
    } else {
      setErrors({ ...errors, [name]: undefined });
    }
    
    setSubmitError(undefined);
  }

  function handleEmailBlur() {
    setEmailTouched(true);
    const emailError = validateEmail(formData.email);
    setErrors({ ...errors, email: emailError });
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    // Validar email antes de enviar
    const emailError = validateEmail(formData.email);
    if (emailError) {
      setErrors({ ...errors, email: emailError });
      return;
    }

    const result = signUpSchema.safeParse(formData);

    if (!result.success) {
      const zErrors: typeof errors = {};
      result.error.issues.forEach((err) => {
        const field = err.path[0] as keyof FormData;
        zErrors[field] = err.message;
      });
      setErrors(zErrors);
      return;
    }

    setLoading(true);
    const serverError = await signUp(result.data);
    setLoading(false);

    if (serverError) {
      setSubmitError(serverError);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8" autoComplete="nope">
      {submitError && (
        <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-md text-sm">
          {submitError}
        </div>
      )}
      <div className="space-y-2">
        <label htmlFor="name" className="block font-medium">
          Nome
        </label>
        <Input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          autoComplete="new-password"
          className={errors.name ? "border-red-500" : ""}
        />
        {errors.name && (
          <p className="text-sm text-red-600">{errors.name}</p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="block font-medium">
          Email
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleEmailBlur}
          autoComplete="off"
          className={errors.email ? "border-red-500" : ""}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
        />
        {errors.email && (
          <p id="email-error" className="text-sm text-red-600">
            {errors.email}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="password" className="block font-medium">
          Senha
        </label>
        <InputPassword
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          autoComplete="new-password"
          className={errors.password ? "border-red-500" : ""}
          placeholder="Digite sua senha..."
          showStrength={true}
        />
        {/* <PasswordStrength password={formData.password} /> */}
        {errors.password && (
          <p className="text-sm text-red-600">{errors.password}</p>
        )}
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Use pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas, números e símbolos.
        </p>
      </div>
      <div className="flex justify-between">
        <Link href="/entrar" className="underline">
          Já tenho conta
        </Link>
        <Button type="submit" disabled={loading || !!errors.email}>
          {loading ? "Cadastrando..." : "Cadastrar"}
        </Button>
      </div>
    </form>
  );
}
