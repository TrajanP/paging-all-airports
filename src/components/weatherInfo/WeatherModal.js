// Bootstrap Imports
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

// Component is used to provide an information Modal for 
// the user to explain how the weather is calculated
const WeatherModal = ({setShow}) => {

  // Modal Handler
  const handleClose = () => setShow(false);

  return (
    <div>
      <Modal show={true} onHide={handleClose}>
        <Modal.Header style={{backgroundColor:"#191e3b"}} closeButton>
          <Modal.Title>Airport Weather Info</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{backgroundColor:"#191e3b"}}>
            General Info
            <ul>
                <li>Airport weather is returned from a decoded METAR report which is a standard for Aviation Weather recording.</li>

                <li>METAR reports are usually updated every hour or half-hour. At worse case, the weather shown on PAA could be an hour behind. This is a limitation from the API. </li>

                <li>The Moon or Sun icon indicates the time of day at the airport.</li>

                <li><span style={{backgroundColor:"#D6D045", borderRadius:"4px", padding:".2rem"}}> Sun</span> - Indicates weather anytime at or after 6:30 and before 18:30.</li>

                <li><span style={{backgroundColor:"#D6D045", borderRadius:"4px", padding:".2rem"}}> Moon</span> - Indicates weather anytime at or after 18:30 and before 6:30.</li>
            </ul>
        </Modal.Body>
        <Modal.Footer style={{backgroundColor:"#191e3b"}}>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
export default WeatherModal;