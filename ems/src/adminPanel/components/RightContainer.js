import styled from "styled-components";

const TopContainer = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #394264;
    margin: 10px;
    width: 23vw;
    height: 50vh;
    border-radius: 10px;
    color: #efefef;
    padding-left: 20px;

    @media(max-width:1080px){
        width:25em;
        margin-left:-1.5em;
        height:14em;
    }


`;

const SearchBarContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 10px;
    width: 90%;
    height: 20%;
`;

const SearchBar = styled.input`
    background-color: #394264;
    border: 1px solid #efefef;
    border-radius: 5px;
    color: #efefef;
    font-size: 20px;
    padding: 10px;
    outline: none;
    margin-top: 10px;
    margin-bottom: 10px;
    height: 3vh;
    transition: all 0.2s ease-in-out;

    &:focus {
        border-bottom: 1.5px solid #11a8ab;
    }

    &::placeholder {
        color: #efefef;
    }
`;

const EventContainer = styled.div`
    display: flex;
    margin: 10px;
    width: 90%;
    height: 80%;

    flex-direction: column;
    align-items: center
`;

const EventNameContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-evenly;

    margin-bottom: 10px;
`; 

const EventName = styled.a`
    font-size: 32px;
`;

const EventOrg = styled.a`
    font-size: 24px;
`;

const RemoveEvent = styled.button`
    height: 5vh;
    width: 50%;

    display: flex;
    justify-content: center;
    align-items: center;

    background-color: red;
    color: white;

    border: 1px solid white;
    border-radius: 10px;

    margin: 10px 0;

    &:hover {
      border: 2px solid white;
    }
`;

const RightContainer = () => {
    return(
      <TopContainer>
        <SearchBarContainer>
          <SearchBar placeholder="EventId"/> 
        </SearchBarContainer>
        <EventContainer>
          <EventNameContainer>
            <img width="65px" height="65px" style={{"borderRadius":"100%", "border":"5px solid #50597b"}} alt="Event"/>
            <EventName>Mesra 2k23</EventName>
          </EventNameContainer>

          <EventOrg>Bannari Amman</EventOrg>
          <RemoveEvent>Remove</RemoveEvent>
        </EventContainer>
      </TopContainer>
    );
};

export { RightContainer };