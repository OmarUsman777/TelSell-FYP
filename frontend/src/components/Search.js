import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';


const Search = ({ history }) => {
  const [keyword, setKeyword] = useState('')
  const [check, setCheck] = useState(false)

  const {
    transcript,
    interimTranscript,
    finalTranscript,
    listening,
  } = useSpeechRecognition();

  useEffect(() => {
    if (finalTranscript !== '') {
      setCheck(true)
      console.log('Got final result:', finalTranscript);

      setKeyword(finalTranscript)
    }
  }, [interimTranscript, finalTranscript]);
  

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null;
  }
 
  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    console.log('Your browser does not support speech recognition software! Try Chrome desktop, maybe?');
  }
  const listenContinuously = () => {
    SpeechRecognition.startListening({
      continuous: false,
      language: 'en-GB',
    });
  };





const submitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      history.push(`/search/${keyword}`)
    } else {
      history.push('/')
    }
  }

  return (
<>
  <Row>
    {listening ? (<Col md= "auto">
    <Form inline>
      <Form.Control
        type='text'
        name='q'
        value = {keyword}
        placeholder='Speak To Search'
        className='mr-sm-2 ml-sm-5'
      ></Form.Control>
      
    </Form>
    </Col>): (<Col md= "auto">
    <Form inline>
      <Form.Control
        type='text'
        name='q'
        onChange={(e) => setKeyword(e.target.value)}
        placeholder='Search Products...'
        className='mr-sm-2 ml-sm-5'
      ></Form.Control>
      
    </Form>
    </Col>)
    }
    
    <Col md= "auto" >
    <Button type='submit' variant='outline-success' className='p-2' onClick = {submitHandler}>
        Search
      </Button>
    </Col>
    <Col  xs lg="2" className = 'mt-2'>
    <img style={{ width: "50%",height: '80%' }} src = '/images/mic_icon5.svg' alt = "mic" onClick={listenContinuously}/>

    </Col>
  </Row>
    
    </>
  )
}

export default Search