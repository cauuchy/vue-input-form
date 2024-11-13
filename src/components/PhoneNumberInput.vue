<template>
  <div class="d-flex align-items-center justify-content-center">
    <input v-model="phone1" maxlength="3" @input="moveToNext(phone1, 'phone2')" placeholder="090" class="form-control me-2 w-80px" :class="{'is-valid': isValid, 'is-invalid': phoneError}" />
    -
    <input v-model="phone2" maxlength="4" @input="moveToNext(phone2, 'phone3')" placeholder="0123" class="form-control mx-2 w-90px" :class="{'is-valid': isValid, 'is-invalid': phoneError}" />
    -
    <input v-model="phone3" maxlength="4" @input="validatePhoneInput" placeholder="4589" class="form-control ms-2 w-90px" :class="{'is-valid': isValid, 'is-invalid': phoneError}" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, defineEmits } from 'vue';
import { validatePhone } from '../utils/validations';

const emit = defineEmits<{
  (e: 'phone-error', error: string): void;
}>();

const phone1 = ref('');
const phone2 = ref('');
const phone3 = ref('');
const phoneError = ref('電話番号は必須です');
const isValid = ref(false);

const validatePhoneInput = () => {
  phoneError.value = validatePhone(phone1.value, phone2.value, phone3.value);
  isValid.value = !phoneError.value;
  emit('phone-error', phoneError.value);
};

// 数字のみの入力を許可
const onlyNumbers = (value: string) => value.replace(/\D/g, '');

const moveToNext = (currentValue: string, nextField: string) => {
  if (currentValue.length === 3 && nextField === 'phone2') {
    (document.querySelector('input[placeholder="0123"]') as HTMLInputElement).focus();
  } else if (currentValue.length === 4 && nextField === 'phone3') {
    (document.querySelector('input[placeholder="4589"]') as HTMLInputElement).focus();
  }
  validatePhoneInput();
};

// 文字が変更された時に数字以外を削除
watch([phone1, phone2, phone3], (newValues) => {
  phone1.value = onlyNumbers(newValues[0]);
  phone2.value = onlyNumbers(newValues[1]);
  phone3.value = onlyNumbers(newValues[2]);
  validatePhoneInput();
});
</script>

<style scoped>
.is-valid {
  border-color: #28a745;
}

.is-invalid {
  border-color: #dc3545;
}
</style>