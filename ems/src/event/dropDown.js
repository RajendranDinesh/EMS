import styled from "styled-components";

const DropDownContainer = styled.div`
    position: absolute;
    top: 80px;
    right: 50px;
    width: 150px;
    padding: 10px;
    border-radius: 10px;
    background-color: #efefef;
    border: 1px solid #000000;

    &::before{
        content: '';
        position: absolute;
        top: -10px;
        right: 20px;
        width: 20px;
        height: 20px;
        transform: rotate(45deg);
        background-color: #efefef;
    }

`

const DropDownList = styled.ul`
    list-style: none;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0;
`

const DropDownItem = styled.li`
    color: #000000;
    font-size: 20px;
    font-weight: 500;
    cursor: pointer;
    transition: color 0.3s ease-out;
`

const logout = () => {
    sessionStorage.removeItem('token')
    window.location.href = '/'
}

export function DropDown() {
    return (
        <DropDownContainer>
            <DropDownList>
                <DropDownItem>Profile</DropDownItem>
                <DropDownItem>Settings</DropDownItem>
                <br></br>
                <DropDownItem onClick={logout}>Logout</DropDownItem>
            </DropDownList>
        </DropDownContainer>
    )
}