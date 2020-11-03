import React, { useState } from 'react';

import { Container, Header, HeaderContent, Profile, Content, Schedule, NextAppointment,Section, Appointment , Calendar } from './styles';

import logoImg from '../../assets/logo.svg';
import { FiClock, FiPower } from 'react-icons/fi';
import { useAuth } from '../../hooks/Auth';

const Dashboard: React.FC = () =>{

  const [selectedDate, setSelectedDate] = useState(new Date());

  const { signOut, user } = useAuth();


  return (
    <Container>
    <Header>
      <HeaderContent>
        <img src={logoImg} alt="GoBarber"/>
        <Profile>
          <img src={user.avatar_url} alt={user.name}/>

          <div>
            <span>Bem-vindo,</span>
            <strong>{user.name}</strong>
          </div>
        </Profile>
        <button type="button" onClick={signOut}> <FiPower/></button>
      </HeaderContent>
    </Header>

    <Content>
      <Schedule>
        <h1>Horários agendados</h1>
        <p>
        <span>hoje</span>
        <span>dia 06</span>
        <span>segunda-feira</span>
        </p>

        <NextAppointment>
          <strong>Atendimento a seguir</strong>
          <div>
            <img src="https://avatars3.githubusercontent.com/u/44537126?s=460&u=17a9a5508a165e1cc0c1b4b03cccae3791d5b4bd&v=4" alt="Joao vitor de jesus silva"/>

            <strong>Joao vitor de jesus silva</strong>
            <span>
              <FiClock/>
              08:00
            </span>
          </div>

        </NextAppointment>
        <Section>
          <strong>Manhã</strong>
          <Appointment>
            <span>
              <FiClock />
              08:00
            </span>
            <div>
              <img src="https://avatars3.githubusercontent.com/u/44537126?s=460&u=17a9a5508a165e1cc0c1b4b03cccae3791d5b4bd&v=4" alt="Joao vitor de jesus silva"/>

              <strong>Joao vitor de jesus silva</strong>
            </div>
          </Appointment>

          <Appointment>
            <span>
              <FiClock />
              08:00
            </span>
            <div>
              <img src="https://avatars3.githubusercontent.com/u/44537126?s=460&u=17a9a5508a165e1cc0c1b4b03cccae3791d5b4bd&v=4" alt="Joao vitor de jesus silva"/>

              <strong>Joao vitor de jesus silva</strong>
            </div>
          </Appointment>
        </Section>

        <Section>
          <strong>Tarde</strong>

          <Appointment>
            <span>
              <FiClock />
              08:00
            </span>
            <div>
              <img src="https://avatars3.githubusercontent.com/u/44537126?s=460&u=17a9a5508a165e1cc0c1b4b03cccae3791d5b4bd&v=4" alt="Joao vitor de jesus silva"/>

              <strong>Joao vitor de jesus silva</strong>
            </div>
          </Appointment>
        </Section>
      </Schedule>
      <Calendar/>
    </Content>
  </Container>
  );
};
export default Dashboard;
