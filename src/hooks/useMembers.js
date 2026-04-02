import { useCallback, useEffect, useState } from "react";
import { supabase } from "../services/supabaseClient";
import {
  getMembers,
  createMember,
  deleteMember as deleteMemberService,
} from "../services/memberService";

export default function useMembers(weddingId) {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadMembers = useCallback(async () => {
    try {
      if (!weddingId) {
        setMembers([]);
        return;
      }

      setLoading(true);
      const data = await getMembers(weddingId);
      setMembers(data || []);
    } catch (error) {
      console.error("Error loading members:", error);
      setMembers([]);
    } finally {
      setLoading(false);
    }
  }, [weddingId]);

  useEffect(() => {
    loadMembers();
  }, [loadMembers]);

  useEffect(() => {
    if (!weddingId) return;

    const channel = supabase
      .channel(`members-${weddingId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "members",
        },
        () => {
          loadMembers();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [weddingId, loadMembers]);

  async function addMember(memberData) {
    const newMember = await createMember({
      ...memberData,
      wedding_id: weddingId,
    });

    await loadMembers();
    return newMember;
  }

  async function deleteMember(memberId) {
    await deleteMemberService(memberId);
    await loadMembers();
  }

  return {
    members,
    loading,
    addMember,
    deleteMember,
    reloadMembers: loadMembers,
  };
}