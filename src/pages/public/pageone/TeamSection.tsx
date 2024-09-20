import { Card } from "antd";

const TeamSection  = () => {
    const teamMembers = [
        {id: 1, name: "John Doe", role:"CEO", bio: "John is the visionary behind our platform...", photo: "src/images/image1.jpg"},
        {id: 2, name: "Jane Smith", role:"CTO", bio: "Jane leads our tech team with expertise in...", photo: "src/images/image2.jpg"},
        {id: 2, name: "Emily Johnson", role:"COO", bio: "Jane leads our tech team with expertise in...", photo: "src/images/image4.jpg"}
    ];

    return (
        <div className="py-10">
            <h2 className="text-3xl font-bold text-center mb-6">Meet Our Team</h2>
            <div className="flex flex-wrap justify-center gap-8">
               {teamMembers.map((member) => (
                <Card className="bg-white shadow-md" style={{height: 300, width: 250}}>
                    <div key={member.id} className="text-center">
                        <img src={member.photo} alt={member.name} className="w-32 h-32 rounded-full mx-auto mb-4"/>
                        <h3 className="text-xl font-semibold">{member.name}</h3>
                        <p className="text-gray-600">{member.role}</p>
                        <p className="mt-2">{member.bio}</p>
                    </div>
                </Card>
                ))}
            </div>
        </div>
   );
};

export default TeamSection;