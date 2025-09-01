import { createClient} from '@supabase/supabase-js';

const URL = 'https://jdfggyibinmdodfqdrjy.supabase.co';
const API_KEY = 'sb_publishable_CHL8nf6l9di1BUsMBnUqUg_XcGhlsRO'
export const supabase = createClient(URL, API_KEY);