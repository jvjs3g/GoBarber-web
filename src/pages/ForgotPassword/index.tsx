import React, { useRef, useCallback } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';
import logoImg from '../../assets/logo.svg';

import { useToast } from '../../hooks/Toast';
import getValidationErros from '../../utils/getValidationErros';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, AnimationContainer, Background } from './styles';

interface ForgotPasswordFormData {
  email: string;
}

const ForgortPassword: React.FC = () => {

  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();


  const  handleSubmit = useCallback( async (data: ForgotPasswordFormData ) => {
    try{
      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        email: Yup.string().required('E-mail obrigatório').email('Digite um e-mail válido'),
      });

      await schema.validate(data, {
        abortEarly:false,
      });

    }catch(err){

      if(err instanceof Yup.ValidationError) {
        const errors = getValidationErros(err);

        formRef.current?.setErrors(errors);

        return;
      }

      addToast({
        type: 'error',
        title: 'erro na recuperação de senha',
        description: 'Ocorreu um erro na recuperação de senha, tente novamente.',
      });
    }
  }, [addToast]);


  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="GoBarber"/>
          <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Recuperar senha </h1>
          <Input name="email" icon={FiMail} placeholder="E-mail"/>

          <Button type="submit">Recuperar</Button>

          </Form>
          <Link to="/"> <FiLogIn/>Voltar ao login</Link>
      </AnimationContainer>
    </Content>

    <Background />
  </Container>
  );
};

export default ForgortPassword;
