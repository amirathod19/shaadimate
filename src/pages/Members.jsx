import { useMemo, useState } from "react";
import PageWrapper from "../components/layout/PageWrapper";
import AddMemberForm from "../components/members/AddMemberForm";
import MemberList from "../components/members/MemberList";
import { useWedding } from "../context/WeddingContext";
import useMembers from "../hooks/useMembers";

export default function Members() {
  const { weddingId } = useWedding();

  const {
    members,
    loading,
    addMember,
    deleteMember,
  } = useMembers(weddingId);

  const [search, setSearch] = useState("");

  const filteredMembers = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return members || [];

    return (members || []).filter((member) => {
      const name = member.name?.toLowerCase() || "";
      const email = member.email?.toLowerCase() || "";
      return name.includes(query) || email.includes(query);
    });
  }, [members, search]);

  return (
    <PageWrapper title="Members">
      <div className="space-y-6">
        {!weddingId ? (
          <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 rounded-2xl p-4">
            Please join or create a wedding first.
          </div>
        ) : (
          <>
            {/* Add Member */}
            <AddMemberForm onAddMember={addMember} />

            {/* Search */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
              <input
                type="text"
                placeholder="Search by name or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-4 py-2 outline-none focus:border-[#e7bfa7]"
              />
            </div>

            {/* Members List */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  Family Members
                </h2>
                <span className="text-sm text-gray-500">
                  {filteredMembers.length}
                </span>
              </div>

              <MemberList
                members={filteredMembers}
                loading={loading}
                onDeleteMember={deleteMember}
                emptyText="No members found"
              />
            </div>
          </>
        )}
      </div>
    </PageWrapper>
  );
}