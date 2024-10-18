// Bootstrap Imports
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

// Component is used to provide an information Modal for the user to explain 
// how the Arrivals are calculated and a key for the status
const ArrivalsModal = ({setShow}) => {
  // Modal Handler
  const handleClose = () => setShow(false);

  return (
    <div>
      <Modal show={true} onHide={handleClose}>
        <Modal.Header style={{backgroundColor:"#191e3b"}} closeButton>
          <Modal.Title>Arrival Times Info</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{backgroundColor:"#191e3b"}}>
            General Info
            <ul>
                <li>Flights shown in Arrivals will begin from an hour before the current time till one hour after.</li>

                <li>Only Flights with logged IATA identification will be displayed.</li>

                <li>Due to API usage limitations, only ten calls are permitted per minute. Rapid back to back queries will cause the API to pause sending Arrival data for a time.</li>

                <li>Due to API usage limitations, dataset limits are set on each query for Arrivals. If an airport has a large set of Arrivals for the two hour window, some flights could be removed until closer to the current time.</li>

            </ul>
            Flight Status
            <ul>
                <li><span style={{backgroundColor:"#5A764D", borderRadius:"4px", padding:".2rem"}}> ARRIVED</span> - A flight has Arrived if a gate arrival time has been recorded. A flight which has arrived will not show delayed regardless of status.</li>
                <li><span style={{backgroundColor:"#6B6969", borderRadius:"4px", padding:".2rem"}}> TAXIING</span> - A flight is Taxiing if a gate arrival time is not yet recorded, but a runway arrival time is. A taxiing flight can be delayed.</li>
                <li><span style={{backgroundColor:"#6B6969", borderRadius:"4px", padding:".2rem"}}> IN AIR</span> - A flight is In Air if a runway arrival time is not yet recorded.</li>
                <li><span style={{backgroundColor:"#B26B2A", borderRadius:"4px", padding:".2rem"}}> DELAYED</span> - A flight is Delayed if the flight has not arrived at the gate and delayed time shows a positive value.</li>
                <li><span style={{backgroundColor:"#D46C5D", borderRadius:"4px", padding:".2rem"}}> CANCELLED</span> - A flight is Cancelled if it has been marked cancelled.</li>
                <li><span style={{backgroundColor:"#B26B2A", borderRadius:"4px", padding:".2rem"}}> DIVERTED</span> - A flight is Diverted if it has been marked diverted.</li>
                <li> You can click each flight&apos;s dropdown to get a more detailed status message.</li>
            </ul>
             Arrival Time 
            <ul>
                <li>Arrival Time is shown in local time of the airport.</li>
                <li>It is converted from UTC time.</li>
                <li>If a flight has arrived at the gate, the Actual Gate Arrival time is shown.</li>
                <li>If a flight has not arrived at the gate, the Scheduled Gate Arrival time is shown.</li>
                <li>If a flight is Delayed, the original Scheduled Gate Arrival time is still shown.</li>
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
export default ArrivalsModal;