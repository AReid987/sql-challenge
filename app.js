const { response } = require('express');
const express = require('express');
const app = express();
app.use(express.json());

const Sequelize = require('sequelize');
const sequelize = new Sequelize('sequelize_db', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: "postgres"
});

const models = require("./database/models");

models.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

// tutorial routes 
app.get('/', async (req, res) => {
  try {
    const posts = await models.Post.findAll({
      include: [
        {
          model: models.Comment,
          as: 'comments'
        },
        {
          model: models.User,
          as: 'author'
        }
      ]
    });
    return res.send(posts)
  } 
  catch (error) {
    return res.status(500).send(error)
  }
})

app.post('/', async (req, res) => {
  try {
    const post = await models.Post.create(req.body);
    return res.send(post)
  } 
  catch (error) {
    return res.status(500).send(error)
  }
})

app.patch('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updated = await models.Post.update(req.body, 
      {
        where: { id: id }
      });

    if (updated) {
      const updatedPost = await models.Post.findOne({ where: { id: id } });
      return res.status(200).send(updatedPost)
    }
    else {
      throw new Error('Post not found');
    }
  } 
  catch (error) {
    return res.status(500).send(error.message);
  }
})

app.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await models.Post.destroy(
      {
        where: { id: id }
      });
      
    if (deleted) {
      return res.send("Post deleted");
    }
    else {
      throw new Error("Post not found");
    }
    
  } catch (error) {
    return res.status(500).send(error.message);
  }
})


// Doctor routes 

// findAll
app.get('/doctors', async (req, res) => {
  try {
    const doctors = await models.Doctor.findAll({
      include: [
        {
          model: models.Patient,
          as: 'patients'
        }
      ]
    });
    return res.send(doctors)
  } 
  catch (error) {
    return res.status(500).send(error)
  }
})

// findOne
app.get('/doctors/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const foundDoctor = await models.Doctor.findOne({ 
      where: { id: id },
      include: { 
        model: models.Patient, 
        as: 'patients'
      }
    });

    if (foundDoctor) {
      return res.status(200).send(foundDoctor)
    }
    else {
      throw new Error('Doctor not found');
    }
  } 
  catch (error) {
    return res.status(500).send(error.message);
  }
})

// create
app.post('/doctors', async (req, res) => {
  try {
    const doctor = await models.Doctor.create(req.body);
    return res.send(doctor)
  } 
  catch (error) {
    return res.status(500).send(error)
  }
})

// update by Id
app.patch('/doctors/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updated = await models.Doctor.update(req.body, 
      {
        where: { id: id }
      });

    if (updated) {
      const updatedDoctor = await models.Doctor.findOne({ 
        where: { id: id },
        include: { 
          model: models.Patient, 
          as: 'patients'
        } 
      });
      return res.status(200).send(updatedDoctor)
    }
    else {
      throw new Error('Doctor not found');
    }
  } 
  catch (error) {
    return res.status(500).send(error.message);
  }
})

// delete by Id
app.delete('/doctors/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await models.Doctor.destroy(
      {
        where: { id: id }
      });
      
    if (deleted) {
      return res.send("Doctor deleted");
    }
    else {
      throw new Error("Doctor not found");
    }
    
  } catch (error) {
    return res.status(500).send(error.message);
  }
})

// Patient Routes 

// findAll
app.get('/patients', async (req, res) => {
  try {
    const patients = await models.Patient.findAll({
      include: [
        {
          model: models.Doctor,
          as: 'doctors'
        }
      ]
    });
    return res.send(patients)
  } 
  catch (error) {
    return res.status(500).send(error)
  }
})

// findOne
app.get('/patients/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const foundPatient = await models.Patient.findOne({ 
      where: { id: id },
      include: { 
        model: models.Doctor, 
        as: 'doctors'
      }
    });

    if (foundPatient) {
      return res.status(200).send(foundPatient)
    }
    else {
      throw new Error('Patient not found');
    }
  } 
  catch (error) {
    return res.status(500).send(error.message);
  }
})

// create
app.post('/patients', async (req, res) => {
  try {
    const patient = await models.Patient.create(req.body);
    return res.send(patient)
  } 
  catch (error) {
    return res.status(500).send(error)
  }
})

// update by Id
app.patch('/patients/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updated = await models.Patient.update(req.body, 
      {
        where: { id: id }
      });

    if (updated) {
      const updatedPatient = await models.Patient.findOne({ 
        where: { id: id },
        include: { 
          model: models.Doctor, 
          as: 'doctors'
        } 
      });
      return res.status(200).send(updatedPatient)
    }
    else {
      throw new Error('Patient not found');
    }
  } 
  catch (error) {
    return res.status(500).send(error.message);
  }
})

// delete by Id
app.delete('/patients/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await models.Patient.destroy(
      {
        where: { id: id }
      });
      
    if (deleted) {
      return res.send("Patient deleted");
    }
    else {
      throw new Error("Patient not found");
    }
    
  } catch (error) {
    return res.status(500).send(error.message);
  }
})

// Appointment Routes 

// findAll
app.get('/appointments', async (req, res) => {
  try {
    const appointments = await models.Appointment.findAll({
      include: [
        models.Patient,
        models.Doctor
      ]
    });
    return res.send(appointments)
  } 
  catch (error) {
    return res.status(500).send(error)
  }
})

// findOne
app.get('/appointments/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const foundAppoinment = await models.Appointment.findOne({ 
      where: { id: id },
      include: [
        models.Doctor,
        models.Patient
      ]
    });

    if (foundAppoinment) {
      return res.status(200).send(foundAppoinment)
    }
    else {
      throw new Error('Appointment not found');
    }
  } 
  catch (error) {
    return res.status(500).send(error.message);
  }
})

app.post('/appointments', async (req, res) => {
  try {
    const appointment = await models.Appointment.create(req.body);
    return res.send(appointment)
  } 
  catch (error) {
    return res.status(500).send(error)
  }
})

// update by Id
app.patch('/appointments/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updated = await models.Appointment.update(req.body, 
      {
        where: { id: id }
      });

    if (updated) {
      const updatedAppointment = await models.Appointment.findOne({ 
        where: { id: id },
        include: [
          models.Doctor,
          models.Patient
        ]
      });
      return res.status(200).send(updatedAppointment)
    }
    else {
      throw new Error('Appointment not found');
    }
  } 
  catch (error) {
    return res.status(500).send(error.message);
  }
})

// delete by Id
app.delete('/appointments/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await models.Appointment.destroy(
      {
        where: { id: id }
      });
      
    if (deleted) {
      return res.send("Appointment deleted");
    }
    else {
      throw new Error("Appointment not found");
    }
    
  } catch (error) {
    return res.status(500).send(error.message);
  }
})

// start the server
app.listen({ port: 4000}, async () => {
  console.log('Server running on http://localhost:4000')
})

// sequelize.authenticate().then(() => {
  //   console.log("Success!");
  // }).catch((err) => {
    //   console.log(err);
    // });