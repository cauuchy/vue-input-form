<template>
  <input
    :type="type"
    :value="modelValue"
    @input="onInput"
    :class="['form-control', { 'is-valid': isValid, 'is-invalid': isInvalid }]"
    :placeholder="placeholder"
  />
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, watch } from 'vue';

const props = defineProps({
  modelValue: String,
  type: { type: String, default: 'text' },
  placeholder: String,
  validationFn: Function,
  isValid: Boolean,
  isInvalid: Boolean
});
const emit = defineEmits(['update:modelValue', 'error']);

const onInput = (event: Event) => {
  const value = (event.target as HTMLInputElement).value;
  emit('update:modelValue', value);
  const error = props.validationFn ? props.validationFn(value) : undefined;
  emit('error', error);
};
</script>

<style scoped>
.is-valid {
  border-color: #28a745;
}

.is-invalid {
  border-color: #dc3545;
}
</style>
