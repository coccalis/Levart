import MembersCard from "../../ui/MembersCard";

function EditMembers({ members, groupId }) {
  console.log(members);
  return (
    <div className="border-1 border-gray-100 rounded-lg shadow-lg p-5 mx-16">
      <div>
        <h1 className=" text-xl text-mainText font-semibold">
          Manage Group Members
        </h1>
      </div>
      <div>
        {members.map((member, index) => (
          <MembersCard key={index} member={member} groupId={groupId} />
        ))}
      </div>
    </div>
  );
}

export default EditMembers;
