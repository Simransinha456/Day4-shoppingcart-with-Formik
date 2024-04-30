// supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fflcmvlwyzivjsgqxlzw.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZmbGNtdmx3eXppdmpzZ3F4bHp3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQzODQzMzQsImV4cCI6MjAyOTk2MDMzNH0.HVHh7QM0w57rLTzDayn1ktEss_wrSi1ruOuhBxxSdQM';
export const supabase = createClient(supabaseUrl, supabaseKey);
