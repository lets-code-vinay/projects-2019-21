const JobDetails = require("../models/Job")
const JobSeekerDetails = require("../models/JobSeeker")
const JobProviderDetails = require("../models/JobProvider")
const { isAcceptedMailToSeeker, isAcceptedMailToProvider } = require("../utils/nodeMailer")
const { hash } = require("bcryptjs")

const cloudinary = require("../utils/cloudinary")
const convertBufferToString = require("../utils/convertBufferToString")

function jobSeekerJobsIncrement(totalPosted) {
    return totalPosted += 1
}

module.exports = {
// -------------------Updating Job by Job-Provider---------------
    async updatingJob(req, res) {
        try {
            await JobDetails.findOneAndUpdate({ id: req.params.jobid,isAccepted:false },{ ...req.body })
            return res.status(202).send({message:'Job updated successfully'})
        }
        catch (error) {
            return res.status(500).send({error:error.message})
        }
    },

    // --------------------Accepting Job by Job Seeker---------------
    async isAcceptedJob(req, res) {
        try {
            const jobOne = await JobDetails.findOne({ _id: req.params.jobid})
            if (jobOne.isAccepted) return res.send({error:"Job has already been accepted or doesn't exist"})

            const job = await JobDetails.findOneAndUpdate({ _id: req.params.jobid },{ isAccepted: true, 
                jobSeekerId: req.jobSeeker._id, jobSeekerName: req.jobSeeker.name,
                 jobSeekerContactNumber: req.jobSeeker.contactNumber, jobSeekerAadhaarNumber: req.jobSeeker.aadhaarNumber })

            isAcceptedMailToProvider(job.jobProviderEmail, job.title, job.createdAt, req.jobSeeker.name);
            isAcceptedMailToSeeker(req.jobSeeker.email, job.title, job.createdAt, job.jobProviderName);

            const jobSeekerDetails = await JobSeekerDetails.findOne({ _id: req.jobSeeker._id })
            const totalAccepted = jobSeekerJobsIncrement(jobSeekerDetails.totalAccepted);
            jobSeekerDetails.totalAccepted = totalAccepted;
            jobSeekerDetails.save()
            return res.status(202).send({message:"Job accepted successfully"})
        }
        catch (err) {
            return res.status(500).send({error:err.message})
        }
    },

    // ---------------------------Uploading Profile-Picture (Job-Provider & Job-Seeker)-----------
    async uploadProfilePicture(req, res) {
        try {
            if (req.jobProvider) { var schema = JobProviderDetails; user = req.jobProvider }
            if (req.jobSeeker) { var schema = JobSeekerDetails; user = req.jobSeeker }
            let imageContent = convertBufferToString(req.file.originalname, req.file.buffer)
            let imageResponse = await cloudinary.uploader.upload(imageContent)
            await schema.findOneAndUpdate({ _id: user._id }, { profilePicture: imageResponse.secure_url })
                
            res.status(202).send({message:"uploaded Profile picture successfully"})
        } catch (error) {
            return res.status(500).send({error:error.message})
        }
    },

    // ---------------------------Editing Profile (Job-Provider & Job-Seeker)-----------
    async editProfile(req, res) {
        try {
            if (req.jobProvider) { var schema = JobProviderDetails; user = req.jobProvider }
            if (req.jobSeeker) { var schema = JobSeekerDetails; user = req.jobSeeker }
            await schema.findOneAndUpdate({_id: user._id }, { contactNumber: req.body.contactNumber, address: req.body.address })
            const User = await schema.findOne({_id:user._id})
            return res.status(202).send({message:"Profile Updated successfully",user:User})
        } catch (error) {
            return res.status(500).send({error:error.message})
        }
    },

    // ---------------------------Changing Password (Job-Provider & Job-Seeker)-----------
    async editPassword(req, res) {
        try {
            if (req.jobProvider) { var schema = JobProviderDetails; user = req.jobProvider }
            if (req.jobSeeker) { var schema = JobSeekerDetails; user = req.jobSeeker }
            const hashedPassword = await hash(req.body.password, 10)
            console.log("hashed=", hashedPassword)
            console.log("user=", user)
            await schema.update({_id: user._id}, { password: hashedPassword })
            return res.status(202).send({message:"Password changed successfully"})

        } catch (error) {
            return res.status(500).send({error:error.message})
        }
    },

    // ----------------------------------------Admin Blocking-----------------------------------------------
    async blocking(req,res){
        try {
            if(req.query.model==="Job-Provider") var schema = JobProviderDetails;
            else if(req.query.model==="Job-Seeker") var schema = JobSeekerDetails;
            else if(req.query.model==="Job") var schema = JobDetails;
            else return res.send({message:"please input valid query in route"});
            const update = await schema.findOneAndUpdate({_id:req.params.id,isBlocked:false},{isBlocked:true});
            if(!update) return res.send({error:"job blocked already"});
            if(req.query.model==="Job-Provider") {
                var schema = JobDetails;
                const Obj = await schema.updateMany({jobProviderId:req.params.id},{isBlocked:true})
            }
            return res.status(202).send({message:"Blocked Succesfully"})
        } catch (error) {
            console.log(error)
            return res.status(500).send({error:error.message})
        }
    }
}
