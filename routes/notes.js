
import  express  from "express";
import fetchUser  from "../middleware/fetchUser.js";
import Notes from '../models/Notes.js';
const router = express.Router();
 
//* Route 1: Get All Notes using : GET "/api/notes/fetchallnotes". Login required

 router.get('/fetchallnotes', fetchUser, async (req, res) => {
    try {
        const notes = await Notes.find({user: req.userId});
        res.json(notes);  
    } catch (error) {
       console.log(error);
       res.status(500).send("Internal Server Error");
    }
 })


//* Route 2: Add Notes using : POST "/api/notes/addnote". Login required

 router.post('/addnote', fetchUser, async (req, res) => {
   try {
      //* data coming from body(frontend)
       const { title, description, tag } = req.body

       //* Validation
       if (!title || !description || !tag) {
          return res.status(400).json({ error: "All fields are required" });
       }

       //* Notes 
       const notes = await Notes({ 
         title, 
         description, 
         tag, 
         user: req.userId });

       //*Saving notes
       const savedNote = await notes.save();
       res.json({savedNote, success : "Note Added Successfully"});
       
   } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
      
   }
 })

//* Route 3: Update an existing Note using : PUT "/api/notes/updatenote". Login required
router.put('/updatenote/:id', fetchUser, async(req, res) => {
     //*data coming from body(frontend)
     const {title, description, tag } = req.body;
     const { id }  = req.params;
   try {
       //*Find the note to updated and update it
       const note = await Notes.findById({ _id: id});
       //*Validation
       if(!note){
         return res.status(404).send("Not Found")
       }
       //*Validation
       if (note.user.toString() !==  req.userId) {
         return res.status(401).send("Not Allowed");
       }

       console.log(note)

       //Note Update
       const notes = await Notes.findByIdAndUpdate(
         { _id: id}, 
         { $set: 
         {title, 
         description, 
         tag
       }
      }, {new : true})
       res.json({notes, success: "Notes updated Successfully"});


   } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
   }
})

//* Route 4: delete an existing Note using : DELETE "/api/notes/deletenote". Login required

 router.delete('/deletenote/:id', fetchUser, async (req, res) => {
   try {
      //* Find th note to be delete and delete it
      let note = await Notes.findById(req.params.id);
      if(!note) { return res.status(404).send("Not Found") }

      //* Allow deletion only if user owns this Note
      if (note.user.toString() !== req.userId) {
         return res.status(401).send("Not Allowed");
      }

      note = await Notes.findByIdAndDelete(req.params.id)
      res.json({ "Success": "Note has been deleted", note: note});
   } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
   }
 })

 //* Route 5: Get  notes bt id: GET "/api/notes/notes/:id" . Login required

 router.get('/notes/:id', fetchUser, async (req, res) =>{
   try {
      const { id } = req.params;

      const notes = await Notes.findById({_id: id});
      console.log(notes)

      if (notes) {
         return res.status(200).json(notes);
      } else {
         return res.status(404).json({ success: "notes Not Found" });
      }
   } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
   }
 })

export default router;