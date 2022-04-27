export type ModalType = 'login' | 'signup' | ''

export interface IModalBodyContent {
  register: (title: any, any) => void
  passwordVisibleHandler: () => void
  passwordType: 'password' | 'text'
}
