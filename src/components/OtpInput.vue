<template>
  <div>
    <input
      v-for="(n, index) in 9"
      :key="n"
      v-model="otp[index]"
      maxlength="1"
      ref="otpInputs"
      @input="moveToNextOtp(index)"
      :disabled="isDisabled"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router'

const router = useRouter()
const otp = ref(Array(9).fill(''));
const otpInputs = ref<HTMLInputElement[]>([]);

const isDisabled = ref(false);

const moveToNextOtp = (index: number) => {
  // 次の入力フィールドにフォーカスを移動
  if (otp.value[index].length === 1 && index < otp.value.length - 1) {
    otpInputs.value[index + 1]?.focus();
  }
  
  // 9桁全て入力されたら処理を完了
  if (otp.value.every((digit) => digit.length === 1)) {
    isDisabled.value = true;
    console.log('OTP Complete:', otp.value.join(''));
    router.push("/welcome");
  }
};
</script>

<style scoped>
input {
  width: 30px;
  text-align: center;
  margin: 5px;
}
</style>
