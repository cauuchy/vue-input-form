<template>
  <div class="container d-flex justify-content-center mt-5 position-relative">
    <div class="col-md-6 col-lg-5 form-wrapper">
      <h2 class="text-center mb-4">ユーザー登録</h2>

      <!-- ユーザーネーム入力 -->
      <div class="mb-3">
        <FormInput
          v-model="username"
          placeholder="ユーザーネーム"
          :validationFn="validateUsername"
          @error="usernameError = $event"
          :is-valid="!usernameError && !!username"
          :is-invalid="!!usernameError || !username"
          :disabled="showOtpInput"
        />
        <p v-if="usernameError" class="text-danger">{{ usernameError }}</p>
      </div>

      <!-- パスワード入力 -->
      <div class="mb-3">
        <div class="input-group">
          <FormInput
            v-model="password"
            :type="passwordVisible ? 'text' : 'password'"
            placeholder="パスワード"
            :validationFn="validatePassword"
            @error="passwordError = $event"
            :is-valid="!passwordError && password !== ''"
            :is-invalid="!!passwordError || !password"
            :disabled="showOtpInput"
          />
          <span class="input-group-text password-toggle" @click="togglePasswordVisibility">
            <svg v-if="passwordVisible" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
              <path d="M13.359 13.238L2.646 2.524l.707-.707 10.713 10.713-.707.707z" fill="currentColor"/>
              <path d="M11.673 10.215L5.785 4.327a5.13 5.13 0 0 1 1.232-.07A5.13 5.13 0 0 1 8 3.873c3.628 0 6.314 3.134 6.314 3.134a1.991 1.991 0 0 1-.943 1.555c.14.247.215.515.215.786a1.99 1.99 0 0 1-.913 1.67L11.673 10.215z" fill="currentColor"/>
              <circle cx="8" cy="8" r="2" fill="white"/>
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
              <path d="M16 8s-3.333-5-8-5-8 5-8 5 3.333 5 8 5 8-5 8-5z"/>
              <path d="M8 11.5a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7z"/>
              <circle cx="8" cy="8" r="2" fill="white"/>
            </svg>
          </span>
        </div>
        <p v-if="passwordError" class="text-danger">{{ passwordError }}</p>
      </div>

      <!-- パスワード確認入力 -->
      <div class="mb-3">
        <div class="input-group">
          <FormInput
            v-model="passwordConfirm"
            :type="passwordConfirmVisible ? 'text' : 'password'"
            placeholder="パスワード(確認用)"
            :validationFn="(value: string) => validatePasswordConfirm(password, value)"
            @error="passwordConfirmError = $event"
            :is-valid="!passwordConfirmError && (passwordConfirm !== '' && passwordConfirm === password)"
            :is-invalid="!!passwordConfirmError || passwordConfirm == ''"
            :disabled="showOtpInput"
          />
          <span class="input-group-text password-toggle" @click="togglePasswordConfirmVisibility">
            <svg v-if="passwordConfirmVisible" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16">
              <path d="M13.359 13.238L2.646 2.524l.707-.707 10.713 10.713-.707.707z"/>
              <path d="M11.673 10.215L5.785 4.327a5.13 5.13 0 0 1 1.232-.07A5.13 5.13 0 0 1 8 3.873c3.628 0 6.314 3.134 6.314 3.134a1.991 1.991 0 0 1-.943 1.555c.14.247.215.515.215.786a1.99 1.99 0 0 1-.913 1.67L11.673 10.215z"/>
              <circle cx="8" cy="8" r="2" fill="white"/>
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
              <path d="M16 8s-3.333-5-8-5-8 5-8 5 3.333 5 8 5 8-5 8-5z"/>
              <path d="M8 11.5a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7z"/>
              <circle cx="8" cy="8" r="2" fill="white"/>
            </svg>
          </span>
        </div>
        <p v-if="passwordConfirmError" class="text-danger">{{ passwordConfirmError }}</p>
      </div>

      <!-- メールアドレス入力 -->
      <div class="mb-3">
        <FormInput
          v-model="email"
          placeholder="メールアドレス"
          :validationFn="validateEmail"
          @error="emailError = $event"
          :is-valid="!emailError && !!email"
          :is-invalid="!!emailError || !email"
          :disabled="showOtpInput"
        />
        <p v-if="emailError" class="text-danger">{{ emailError }}</p>
      </div>

      <!-- 電話番号入力 -->
      <div class="mb-3">
        <PhoneNumberInput @phone-error="phoneError = $event" :disabled="showOtpInput" :is-valid="!phoneError"/>
        <p v-if="phoneError" class="text-danger">{{ phoneError }}</p>
      </div>

      <!-- 利用規約リンク -->
      <div class="mb-3 text-center">
        <a href="#" @click.prevent="showTermsPopup = true">利用規約</a>
      </div>

      <!-- 登録ボタン -->
      <div class="d-grid">
        <button class="btn btn-primary" :disabled="!isFormValid || !termsAccepted" @click="registerUser">登録</button>
      </div>
    </div>

    <!-- OTPポップアップ -->
    <div v-if="showOtpInput" class="otp-popup d-flex flex-column align-items-center justify-content-center">
      <button class="close-btn" @click="cancelOtp">✕</button>
      <h2 class="mb-4">ワンタイムパスワード</h2>
      <OtpInput @otp-complete="handleOtpComplete" />
    </div>
    <div v-if="showOtpInput" class="overlay"></div>

    <!-- 利用規約ポップアップ -->
    <div v-if="showTermsPopup" class="terms-popup">
      <button class="close-btn" @click="closeTermsPopup">✕</button>
      <h2 class="mb-4">利用規約</h2>
      <div class="terms-content" ref="termsContent">
        <TermsPopup />
      </div>
      <button class="btn btn-primary" :disabled="!termsScrolled" @click="acceptTerms">OK</button>
    </div>
    <div v-if="showTermsPopup" class="overlay"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { validateUsername, validatePassword, validatePasswordConfirm, validateEmail } from '../utils/validations';
import FormInput from './FormInput.vue';
import PhoneNumberInput from './PhoneNumberInput.vue';
import OtpInput from './OtpInput.vue';
import TermsPopup from './TermsPopup.vue'

const username = ref('');
const password = ref('');
const passwordConfirm = ref('');
const email = ref('');
const phoneError = ref('');
const usernameError = ref('');
const passwordError = ref('');
const passwordConfirmError = ref('');
const emailError = ref('');
const showOtpInput = ref(false);
const otpComplete = ref(false);
const passwordVisible = ref(false);
const passwordConfirmVisible = ref(false);
const showTermsPopup = ref(false);
const termsAccepted = ref(false);
const termsScrolled = ref(false);

console.log(termsScrolled);

const registerUser = () => {
  sessionStorage.setItem('username', username.value);
  showOtpInput.value = true;
};

const isFormValid = computed(() => {
  return (
    !usernameError.value &&
    !passwordError.value &&
    !passwordConfirmError.value &&
    !emailError.value &&
    !phoneError.value &&
    username.value &&
    password.value &&
    passwordConfirm.value &&
    email.value &&
    phoneError.value === '' &&
    termsAccepted.value
  );
});

const togglePasswordVisibility = () => {
  passwordVisible.value = !passwordVisible.value;
};

const togglePasswordConfirmVisibility = () => {
  passwordConfirmVisible.value = !passwordConfirmVisible.value;
};

const cancelOtp = () => {
  showOtpInput.value = false;
};

const handleOtpComplete = () => {
  otpComplete.value = true;
  showOtpInput.value = false;
};

const closeTermsPopup = () => {
  showTermsPopup.value = false;
};

const acceptTerms = () => {
  termsAccepted.value = true;
  closeTermsPopup();
};

// スクロールイベントを監視
const termsContent = ref<HTMLElement | null>(null);
watch(termsContent, (newVal) => {
  if (!termsScrolled.value && newVal) {
    newVal.addEventListener('scroll', () => {
      const { scrollTop, scrollHeight, clientHeight } = newVal;
      if (scrollTop + clientHeight >= scrollHeight) {
        termsScrolled.value = true;
        newVal.removeEventListener('scroll', () => {});
      }
    });
  }
});
</script>

<style scoped>
.container {
  max-width: 800px;
}

.form-wrapper {
  position: relative;
}

.otp-popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  width: 500px;
  text-align: center;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 900;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.5em;
  cursor: pointer;
}

.terms-popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  width: 500px;
  max-height: 80vh;
  overflow-y: auto;
}

.terms-content {
  max-height: 60vh;
  overflow-y: auto;
}

</style>
