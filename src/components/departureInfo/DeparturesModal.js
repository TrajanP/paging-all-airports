// Bootstrap Imports
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

// Component is used to provide an information Modal for the user to explain 
// how the Departures are calculated and a key for the status
const DeparturesModal = ({setShow}) => {

  //Modal Handler
  const handleClose = () => setShow(false); 

  return (
    <div>
      <Modal show={true} onHide={handleClose}>
        <Modal.Header style={{backgroundColor:"#191e3b"}} closeButton>
          <Modal.Title>Departure Times Info</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{backgroundColor:"#191e3b"}}>
            General Info
            <ul>
                <li>Flights shown in Departures will begin from an hour before the current time till one hour after.</li>

                <li>Only Flights with logged IATA identification will be displayed.</li>

                <li>Due to API usage limitations, only ten calls are permitted per minute. Rapid back to back queries will cause the API to pause sending Departure data for a time.</li>

                <li>Due to API usage limitations, dataset limits are set on each query for Departures. If an airport has a large set of Departures for the two hour window, some flights could be removed until closer to the current time.</li>

            </ul>
            Flight Status
            <ul>
                <li><span style={{backgroundColor:"#6B6969", borderRadius:"4px", padding:".2rem"}}> ON TIME</span> - A flight is On Time if no departure delay has been posted.</li>
                <li><span style={{backgroundColor:"#5A764D", borderRadius:"4px", padding:".2rem"}}> DEPARTED</span> - A flight has Departed if a an actual gate departure time has been posted. A flight which has departed the gate will not show delayed regardless of status.</li>
                <li><span style={{backgroundColor:"#B26B2A", borderRadius:"4px", padding:".2rem"}}> DELAYED</span> - A flight is Delayed if the flight has not departed the gate and delayed time shows a positive value.</li>
                <li><span style={{backgroundColor:"#D46C5D", borderRadius:"4px", padding:".2rem"}}> CANCELLED</span> - A flight is Cancelled if it has been marked cancelled.</li>
                <li><span style={{backgroundColor:"#B26B2A", borderRadius:"4px", padding:".2rem"}}> DIVERTED</span> - A flight is Diverted if it has been marked diverted.</li>
                
                <li> You can click each flight&apos;s dropdown to get a more detailed status message.</li>
            </ul>
             Departure Time 
            <ul>
                <li>Departure Time is shown in local time of the airport.</li>
                <li>It is converted from UTC time.</li>
                <li>If a flight has departed the gate, the Actual Gate Departure time is shown.</li>
                <li>If a flight has not departed the gate, the Scheduled Gate Departure time is shown.</li>
                <li>If a flight is Delayed, the original Scheduled Gate Departure time is still shown.</li>
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
export default DeparturesModal;