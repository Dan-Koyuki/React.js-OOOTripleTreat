import React from "react";
import styled from "styled-components";
const About = () => {
  const data = [
    {
      name: "Irwanto Danang Bahtiar",
      nim: "1217050070",
      img: "https://wallpapercave.com/uwp/uwp4090074.png",
      contribution: [
        "Full Stack",
        "Documentation (Diagrams, Product Owner, Scrum Master)",
        "Testing",
      ],
    }
  ];

  return (
    <StyledAbout>
      <AboutContainer>
        <h2>About</h2>
        <p>Hello there, Group 3 here.</p>
        <p>
          This app is the result of our dedication and skills developed
          throughout Software Project Management course.
        </p>
        <p><strong>Our Team:</strong></p>
        <Team>
          {data &&
            data?.map((member, index) => (
              <Member key={index}>
                <h3>{member.name}</h3>
                <p><strong>{member.nim}</strong></p>
                <img src={member.img} alt={member.name} />
                {member.contribution ? (
                  <>
                    {member.contribution.map((contribute, index) => (
                      <Contribution key={index}>{contribute}</Contribution>
                    ))}
                  </>
                ) : null}
              </Member>
            ))}
        </Team>
      </AboutContainer>
    </StyledAbout>
  );
};

export default About;

const StyledAbout = styled.div`
  margin: 0.5rem;
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
  h3{
    margin: 1.5rem 0 0.5rem 0;
  }
`;

const Team = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
  img{
    width: 150px;
    height: 150px;
    margin-top: 1rem;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 1rem;
    border-radius: 75%;
    object-fit: cover;
  }
`

const AboutContainer = styled.div`
  max-width: 1300px;
  width: 100%;
  height: 575px;
  margin-left: 1.5rem;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 5px;
  padding: 2rem;
  overflow-y: auto;
  h2{
    text-align: center;
  }
  p{
    text-align: center;
  }
`;

const Member = styled.div`
  width: 300px;
  max-width: 100%;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 1rem auto;
  padding: 1rem;
  box-shadow: -5px -5px 10px rgba(255, 255, 255, 0.5), 2px 2px 5px rgba(94, 104, 121, 0.3);
  border-radius: 15px;

  h3{
    text-align: center;
  }
`;

const Contribution = styled.li`
  margin-left: 0.5rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
`;
