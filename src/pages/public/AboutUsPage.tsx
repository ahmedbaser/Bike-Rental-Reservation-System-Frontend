import ContactInformation from "./pageone/ContactInformation";
import HistoryMilestones from "./pageone/HistoryMilestones";
import MissionStatement from "./pageone/MissionStatement";
import TeamSection from "./pageone/TeamSection";

const AboutUsPage = () => {
    return (
        <div>
            <MissionStatement/>
            <TeamSection/>
            <HistoryMilestones/>
            <ContactInformation/>
        </div>
    );
};

export default AboutUsPage;