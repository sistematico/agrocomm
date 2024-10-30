<template>
  <div>
    <h3>Cotações</h3>
    <div class="flex items-center justify-center min-h-[450px]">
      <div class="overflow-x-auto relative shadow-md sm:rounded-lg">
        <div class="overflow-x-auto relative shadow-md sm:rounded-lg">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="py-3 px-6">Person</th>
                <th scope="col" class="py-3 px-6">Bank Account</th>
                <th scope="col" class="py-3 px-6">Amount</th>
                <th scope="col" class="py-3 px-6">Approved</th>
              </tr>
            </thead>
            <tbody>
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td class="py-4 px-6">Alex Johnson</td>
                <td class="py-4 px-6">82926417</td>
                <td class="py-4 px-6">$4,500.00</td>
                <td class="py-4 px-6">Yes</td>
              </tr>
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td class="py-4 px-6">Maria Garcia</td>
                <td class="py-4 px-6">55387621</td>
                <td class="py-4 px-6">$3,150.00</td>
                <td class="py-4 px-6">No</td>
              </tr>
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td class="py-4 px-6">James Smith</td>
                <td class="py-4 px-6">90817264</td>
                <td class="py-4 px-6">$7,820.00</td>
                <td class="py-4 px-6">Yes</td>
              </tr>
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td class="py-4 px-6">Patricia Brown</td>
                <td class="py-4 px-6">26483910</td>
                <td class="py-4 px-6">$1,230.00</td>
                <td class="py-4 px-6">Yes</td>
              </tr>
              <tr class="bg-white dark:bg-gray-800">
                <td class="py-4 px-6">Ethan Davis</td>
                <td class="py-4 px-6">64738290</td>
                <td class="py-4 px-6">$865.00</td>
                <td class="py-4 px-6">No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>