function About() {
  return (
    <div className="about-main-container">
      <div className="about-containers-top">
        <img src="Personal.jpg" alt="ramiJuma photo" className="personal-img" />
        <div className="about-info-container">
          <h5 className="about-title">About me</h5>
          <p>
            I'm a Jordanian/German artist in the animation industry, with great passion for visual development and digital painting.
          </p>
        </div>
      </div>
      <div className="about-containers">
        <p className="about-text-top">Present <br /> - <br /> Feb 2023</p>
        <div className="work-container">
          <img src="Imagenary.jpg" alt="Imagenary" className="work-img-top" />
          <p className="text">
            <strong>Les Films Du Poisson Rouge</strong><br />
            Angoulême, France<br />
            Light & Shadow Effects Artist<br />
            for Studio Ponoc's anime film<br />
            `The Imaginary`
          </p>
        </div>
      </div>
      <div className="about-containers">
        <p className="about-text">Feb 2022<br />-<br />Jul 2021</p>
        <div className="work-container">
          <img src="MFD.jpg" alt="My Fathers Dragon image" className="work-img" />
          <p className="text">
            <strong>Cartoon Saloon</strong><br />
            Kilkenny, Ireland<br />
            Character Shadow Visual Effects Artist<br />
            On the Netflix feature film<br />
            `My Father's Dragon`
          </p>
        </div>
      </div>
      <div className="about-containers">
        <p className="about-text">2020<br />-<br />2013</p>
        <div className="work-container">
          <p className="text">
            <strong>Freelance animation and illustration</strong><br />
            Creativiva Entertainment,Toronto<br />
            Twisted Studios Animation, Amman<br />
            Justice Center for Legal Aid, Amman<br />
            Khaleejesque Magazine, Kuwait<br />
            Jabal Amman Publishers, Amman<br />
            Ecartoons Studio, Amman
          </p>
        </div>
      </div>
      <div className="about-containers">
        <p className="about-text">2013</p>
        <div className="work-container">
          <p className="text">
            <strong>M.Sc. in International Business</strong><br />
            London South Bank University<br />
            London, UK
          </p>
        </div>
      </div>
      <div className="about-containers">
        <p className="about-text">2008</p>
        <div className="work-container">
          <p className="text">
            <strong>B.Sc. in Computer Science</strong><br />
            The University of Jordan <br />
            Amman, Jordan
          </p>
        </div>
      </div>
    </div>
  )
}

export default About;