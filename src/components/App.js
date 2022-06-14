import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Section from "./Section";
import ProfileCard from "./ProfileCard";
import profileImgLot from "../images/council-members/lot.jpeg";

function App() {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <main className="flex-grow">
        <Section>
          <Section.Text>To provide an active learning space for young cyclists to boost youth voice in the bicycle space through peer leadership.</Section.Text>
          <Section.Text>
            We noticed a huge lack of representation, leadership, voice and direct-path opportunities for youth in the bicycle industry. Our members express the
            concern of there not being many youth in the space nation-wide or spaces for youth by youth. These are some of the factors that directly affect
            youth-ridership decline in the US.
          </Section.Text>
        </Section>
        <Section>
          <ProfileCard>
            <ProfileCard.Img src={profileImgLot} alt="profile image of lot" />
            <ProfileCard.Title>Luly M.</ProfileCard.Title>
            <ProfileCard.Subtitle>Council Member</ProfileCard.Subtitle>
            <ProfileCard.Text>
              I have learned so much about organizational planning and networking thanks to being on the council. The Council has especially helped me learn how
              to work well within a group towards a specific goal.
            </ProfileCard.Text>
            <ProfileCard.Location>Pennsylvania</ProfileCard.Location>
          </ProfileCard>
        </Section>
      </main>
      <Footer />
    </div>
  );
}

export default App;
