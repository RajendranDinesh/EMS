const router = require('express').Router(); // Importing the express router module
const jwt = require("jsonwebtoken"); // Importing the jsonwebtoken module for creating and verifying tokens

const { Teams } = require('../model/team');
const { User } = require('../model/user')

// Authenticate token
function authenticateToken(req, res, next) {
    
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Token verification failed' });
      }
  
      req.user = user;
      next();
    });
}

router.get('/teams/user', authenticateToken, async (req, res) => {
    try {
        const user = await User.findOne({ _id : req.user._id }, 'fname email _id');
        const teamsUserIsPartOf = await Teams.find({ members: req.user._id.toString() });
        let teamObjects = [];

        for( const team of teamsUserIsPartOf){
            if(user._id.toString() === team.createdBy){
                const teamMembers = team.members.filter(member => member !== user._id.toString());
                const teamMembersObjects = [];

                for(const member of teamMembers){
                    const tempUser = await User.findOne({_id: member}, 'fname email _id');
                    teamMembersObjects.push({
                        name: tempUser.fname,
                        email: tempUser.email
                    })
                }

                const teamObject = {
                    teamName: team.teamName,
                    teamLead: {
                        name: user.fname,
                        email: user.email
                    },
                    teamMembers: teamMembersObjects
                }

                teamObjects.push(teamObject);
            }
            else{
                const user = await User.findOne({_id: team.createdBy}, 'fname email');
                const teamMembers = team.members.filter(member => member !== team.createdBy);
                const teamMembersObjects = [];

                for(const member of teamMembers){
                    const tempUser = await User.findOne({_id: member}, 'fname email');
                    teamMembersObjects.push({
                        name: tempUser.fname,
                        email: tempUser.email
                    })
                }

                const teamObject = {
                    teamName: team.teamName,
                    teamLead: {
                        name: user.fname,
                        email: user.email
                    },
                    teamMembers: teamMembersObjects
                }

                teamObjects.push(teamObject);
            }
        }

        res.status(200).send({teamObjects});
    } catch (error) {
        console.log(error)
        res.status(500).send({message: error.message});
    }
});

router.get('/teams/teaminfo/:teamname/:eventId', authenticateToken, async (req, res) => {
    try {
        const teams = await Teams.findOne({ teamName: req.params.teamname }, 'teamName createdBy members');

        const teamLength = teams.members.length;
        
        res.status(200).send({teamName: teams.teamName, totalMembers: teamLength});
    } catch (error) {
        console.log(error)
        res.status(500).send({message: error.message});
    }
});

router.post('/teams/newteam', authenticateToken, async (req, res) => {
    try {
        const newTeamUserId = [];
        for (const userEmail of req.body.newTeamData){
            const userRegistered = await User.findOne({ email: userEmail }, '_id')
            if(!userRegistered) 
            {
                return res.status(404).send({message: `${userEmail} has not registered with us. Kindly Retry After Registering...`});
            }
            else{
                newTeamUserId.push(userRegistered._id.toString());
            }
        }

        const newTeam = new Teams({
            teamName: req.body.newTeamName,
            createdBy: req.user._id,
            members: newTeamUserId
        })

        await newTeam.save();

        res.status(200).send({message: 'Team Created'});
    } catch (error) {
        if(error.code === 11000) return res.status(409).send({message: 'Team With same Name Already Exists'});
        console.log(error)
        res.status(500).send({message: error.message});
    }
});

router.delete('/teams/delete', authenticateToken, async (req, res) => {
    try {
        await Teams.findOneAndDelete({ teamName: req.body.teamName, createdBy: req.user._id });
        res.status(200).send({message: 'Team Deleted'});
    } catch (error) {
        console.log(error)
        res.status(500).send({message: error.message});
    }
});

module.exports = router;