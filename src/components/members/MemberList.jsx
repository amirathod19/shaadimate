export default function MemberList({
  members,
  loading,
  onDeleteMember,
  emptyText = "No members found",
}) {
  if (loading) {
    return <p className="text-sm text-gray-500">Loading members...</p>;
  }

  if (!members?.length) {
    return <p className="text-sm text-gray-400">{emptyText}</p>;
  }

  return (
    <div className="space-y-3">
      {members.map((member) => (
        <div
          key={member.id}
          className="border border-gray-100 rounded-2xl p-4 bg-white shadow-sm flex items-start justify-between gap-4"
        >
          <div>
            <h3 className="font-semibold text-gray-900">{member.name}</h3>
            {member.email ? (
              <p className="text-sm text-gray-500 mt-1">{member.email}</p>
            ) : null}
            <span className="inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
              {member.role || "family"}
            </span>
          </div>

          <button
            onClick={() => onDeleteMember(member.id)}
            className="px-3 py-2 rounded-xl bg-red-50 text-sm font-medium text-red-600"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}