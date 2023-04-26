import ProgressBar from 'react-bootstrap/ProgressBar';
import 'bootstrap/dist/css/bootstrap.min.css';

function Progress(props) {
  return <ProgressBar animated now={props.percent} />;
}

export default Progress;