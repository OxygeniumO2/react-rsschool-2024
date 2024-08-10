import { redirect } from '@remix-run/node';

export const loader = async () => {
  return redirect('/search/name=""/1');
};

export default function Index() {
  return null;
}
