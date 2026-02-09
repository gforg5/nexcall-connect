import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

interface Profile {
  id: string;
  user_id: string;
  username: string | null;
  display_name: string | null;
  avatar_url: string | null;
  status: string | null;
}

interface Contact {
  id: string;
  contact_user_id: string;
  nickname: string | null;
  profile?: Profile;
}

export const useContacts = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchContacts = async () => {
    if (!user) return;
    setLoading(true);

    const { data, error } = await supabase
      .from("contacts")
      .select("id, contact_user_id, nickname")
      .eq("user_id", user.id);

    if (error) {
      console.error("Error fetching contacts:", error);
      setLoading(false);
      return;
    }

    // Fetch profiles for each contact
    if (data && data.length > 0) {
      const contactUserIds = data.map((c) => c.contact_user_id);
      const { data: profiles } = await supabase
        .from("profiles")
        .select("*")
        .in("user_id", contactUserIds);

      const enriched = data.map((c) => ({
        ...c,
        profile: profiles?.find((p) => p.user_id === c.contact_user_id),
      }));
      setContacts(enriched);
    } else {
      setContacts([]);
    }

    setLoading(false);
  };

  const addContact = async (contactEmail: string) => {
    if (!user) return;

    // Find user by searching profiles
    const { data: profiles } = await supabase
      .from("profiles")
      .select("user_id, username")
      .or(`username.ilike.%${contactEmail}%`);

    if (!profiles || profiles.length === 0) {
      toast({
        title: "User not found",
        description: "No user found with that username.",
        variant: "destructive",
      });
      return;
    }

    const contactProfile = profiles[0];
    if (contactProfile.user_id === user.id) {
      toast({
        title: "Can't add yourself",
        description: "You cannot add yourself as a contact.",
        variant: "destructive",
      });
      return;
    }

    const { error } = await supabase.from("contacts").insert({
      user_id: user.id,
      contact_user_id: contactProfile.user_id,
    });

    if (error) {
      if (error.code === "23505") {
        toast({ title: "Already added", description: "This contact already exists." });
      } else {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      }
      return;
    }

    toast({ title: "Contact added!" });
    fetchContacts();
  };

  const removeContact = async (contactId: string) => {
    const { error } = await supabase.from("contacts").delete().eq("id", contactId);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Contact removed" });
    fetchContacts();
  };

  useEffect(() => {
    fetchContacts();
  }, [user]);

  return { contacts, loading, addContact, removeContact, refetch: fetchContacts };
};
