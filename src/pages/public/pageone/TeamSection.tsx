import { Card } from "antd";

const TeamSection  = () => {
    const teamMembers = [
        {id: 1, name: "John Doe", role:"CEO", bio: "John is the visionary behind our platform...", Image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDN8fHxlbnwwfHx8fHw%3D/150'},
        {id: 2, name: "Jane Smith", role:"CTO", bio: "Jane leads our tech team with expertise in...", Image:'https://images.unsplash.com/photo-1559718062-361155fad299?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D/150'},
        {id: 2, name: "Emily Johnson", role:"COO", bio: "Jane leads our tech team with expertise in...", Image:'https://plus.unsplash.com/premium_photo-1670884522719-d7f4bcdfcbeb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDh8fHxlbnwwfHx8fHw%3D/150'}
    ];

    return (
        <div className="py-10">
            <h2 className="text-3xl font-bold text-center mb-6">Meet Our Team</h2>
            <div className="flex flex-wrap justify-center gap-8">
               {teamMembers.map((member) => (
                <Card className="bg-white shadow-md" style={{height: 300, width: 250}}>
                    <div key={member.id} className="text-center">
                        <img src={member.Image} alt={member.name} className="w-32 h-32 rounded-full mx-auto mb-4"/>
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