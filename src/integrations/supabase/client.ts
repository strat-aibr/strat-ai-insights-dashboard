// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://ubhpkbvtveofjzxdbssz.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InViaHBrYnZ0dmVvZmp6eGRic3N6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ0MTE1NjksImV4cCI6MjA0OTk4NzU2OX0.C_jFaQBrQxJdsyrlSEvwF4sH6zoNN84M0KhpDeXN6oc";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);