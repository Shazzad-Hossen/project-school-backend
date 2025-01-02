const { auth, checkRole } = require("../middleware");
const { createTeamMember, getAllTeamMembers, deleteOneTeamMember, getSingleTeamMember, editOneTeamMember } = require("./team.entity");


function team(){
    this.route.post('/team',auth, checkRole(['admin']), createTeamMember(this));
    this.route.get('/team', getAllTeamMembers(this));
    this.route.get('/team/:id',getSingleTeamMember(this));
    this.route.patch('/team/:id',auth, editOneTeamMember(this));
    
    this.route.delete('/team/:id',auth, checkRole(['admin']),  deleteOneTeamMember(this));
    

    


}

module.exports=team;