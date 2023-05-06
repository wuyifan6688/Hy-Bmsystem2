import { ref } from 'vue'
import type pageForm from '@/components/pageForm/pageForm.vue'
function usePageForm(editCallback?: any) {
  const son = ref<InstanceType<typeof pageForm>>()
  function createUser() {
    son.value?.create(false)
  }
  function changeUser(messege: any) {
    if (editCallback) editCallback(messege)
    son.value?.create(true, messege)
  }
  return {
    son,
    createUser,
    changeUser
  }
}
export default usePageForm
