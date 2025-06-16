<script setup lang="ts">
import { ref } from 'vue'
import { useToast } from 'vue-toastification'
import { useCreateShortLink } from './hooks/useShort'
import type { AxiosError } from 'axios'

const toast = useToast()
const urlInput = ref('')
const shortenedUrl = ref('')

const { mutate: createShortLink, isPending } = useCreateShortLink()

const handleSubmit = () => {
  if (!urlInput.value.trim()) {
    toast.error('URL cannot be empty!')
    return
  }

  createShortLink(urlInput.value, {
    onSuccess: (data) => {
      shortenedUrl.value = data.short
      toast.success(data.message)
      urlInput.value = ''
    },
    onError: (error) => {
      const err = error as AxiosError<{ message: string }>
      const errorMessage =
        err.response?.data?.message || err.message || 'Failed to create short link'
      toast.error(errorMessage)
    },
  })
}
</script>

<template>
  <div class="text-center pt-25 text-black pb-10">
    <h1 class="text-3xl">User Friendly</h1>
    <h1 class="text-7xl font-bold">Short Link Generator</h1>
  </div>

  <div class="p-4 flex flex-col gap-3 bg-blue-100 max-w-screen-md w-full m-auto rounded-2xl">
    <h1 class="text-black text-center text-3xl font-bold">Paste the URL to be shortened</h1>

    <div class="join flex flex-row justify-center w-full">
      <input
        class="input bg-white w-full text-black border-gray-50 outline-none focus:outline-none focus:ring-0 ring-0 focus:border-none border-none shadow-none"
        type="text"
        placeholder="Place your long URL here"
        v-model="urlInput"
        required
      />
      <button
        @click="handleSubmit"
        :disabled="isPending"
        class="btn btn-neutral join-item bg-gray-700"
      >
        <span v-if="!isPending">Shorten</span>
        <span v-else class="loading loading-spinner"></span>
      </button>
    </div>
  </div>

  <div class="p-4 bg-blue-100 max-w-screen-md w-full m-auto rounded-2xl mt-4">
    <h1 class="text-black text-3xl font-bold">Result</h1>
    <a
      class="mt-2 text-blue-700 cursor-pointer underline break-all"
      :href="shortenedUrl"
      target="_blank"
    >
      {{ shortenedUrl }}
    </a>
  </div>
</template>
