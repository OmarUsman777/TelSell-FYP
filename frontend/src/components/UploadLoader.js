import React from 'react'
import {Row, Col, Image} from 'react-bootstrap'
const UploadLoader = () => {
    return (
            <Row>
                  <Col md={5}>
                    <Image src="/images/empty_review2.gif" alt="image" fluid rounded />
                  </Col>
    </Row>

    )
}

export default UploadLoader
