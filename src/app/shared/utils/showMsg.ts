import { IconType } from './IconType';
import { Toast } from './sweetalert';

export default function showMessage(
  icon: IconType,
  title: string,
  text: string,
  timer: number = 3000
) {
  Toast.fire({ icon, title, text, timer });
}
