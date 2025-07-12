

// 'use client'

// import Form from 'next/form'
// import { signin } from '@/actions'
// import { useActionState } from 'react'
// import { FormState } from '@/types'

// export default function SigninForm() {
//   const [state, action, pending] = useActionState<FormState, FormData>(signin, undefined)

//   return (
//     <Form className="space-y-6" action={action}>
//       {/* Exibir mensagem de erro geral */}
//       {state?.message && (
//         <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
//           {state.message}
//         </div>
//       )}


//       <div>
//         <label htmlFor="email" className="block font-medium">
//           Email
//         </label>
//         <div className="mt-2">
//           <input
//             type="email"
//             name="email"
//             id="email"
//             autoComplete="email"
//             required
//             className="block w-full rounded-md bg-black/10 border-2 border-black/20 px-3 py-1.5 placeholder:text-gray-400 sm:text-sm/6 focus:outline-none"
//             defaultValue="agrocomm@agrocomm.com.br"
//           />
//         </div>
//         {state?.errors?.email && <p>{state.errors.email}</p>}
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
//             defaultValue="password"
//           />
//         </div>
//         {state?.errors?.password && <p>{state.errors.password}</p>}
//       </div>
      
//       <div>
//         <button
//           type="submit"
//           className="cursor-pointer bg-green-700 text-white px-5 py-2 rounded-md hover:bg-green-800 transition-colors"
//           disabled={pending}
//         >
//           Entrar
//         </button>
//       </div>
//     </Form>
//   )
// }

"use client";

import { useState } from "react";
import { signin } from "@/actions";
import { z } from "zod";
import { signInSchema } from "@/schemas/auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { InputPassword } from "@/components/ui/password";
import Link from "next/link";

type FormData = z.infer<typeof signInSchema>;

export function SignInForm() {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {}
  );
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

    const result = signInSchema.safeParse(formData);
    if (!result.success) {
      const map: typeof errors = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof FormData;
        map[field] = err.message;
      });
      setErrors(map);
      return;
    }

    setLoading(true);
    const error = await signin(result.data);
    setLoading(false);

    if (error) setSubmitError(error);
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      {submitError && (
        <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-md text-sm">
          {submitError}
        </div>
      )}
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
          className={errors.password ? "border-red-500" : ""}
          placeholder="Digite sua senha..."
        />
        {errors.password && (
          <p className="text-sm text-red-600">{errors.password}</p>
        )}
      </div>
      <div className="flex items-center justify-between">
        <div>
          Ainda não tem uma conta?{" "}
          <Link href="/cadastro" className="underline">
            Cadastre-se
          </Link>
        </div>
        <Button type="submit" disabled={loading || !!errors.email || !!errors.password}>
          {loading ? "Entrando..." : "Entrar"}
        </Button>
      </div>
    </form>
  );
}
