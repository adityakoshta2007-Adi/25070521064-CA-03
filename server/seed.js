import 'dotenv/config';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from './models/User.js';
import Quest from './models/Quest.js';
const uri=process.env.MONGODB_URI||'mongodb://127.0.0.1:27017/lifeos';
await mongoose.connect(uri);
let user=await User.findOne({email:'professor@lifeos.demo'});
if(!user){user=await User.create({name:'Professor Explorer',email:'professor@lifeos.demo',passwordHash:await bcrypt.hash('LifeOSDemo2026!',10),demo:true});}
const samples=[
['Design your 90-day protocol','Growth','Define one measurable outcome for the next 90 days and break it into three milestones.','Medium',120,'In Progress'],
['Deep work: 25-minute sprint','Focus','Choose one task, silence distractions, and work until the timer ends.','Easy',40,'Available'],
['Move your body','Health','Complete a 20-minute walk, stretch, or workout. Record how you feel afterward.','Easy',35,'Completed'],
['Learn one difficult concept','Learning','Study one challenging concept and explain it in your own words without notes.','Hard',100,'Available'],
['Digital sunset','Mind','Spend the last 30 minutes before sleep away from social media and scrolling.','Medium',60,'In Progress'],
['Weekly reflection','Mind','Write three wins, one lesson, and one adjustment for next week.','Easy',50,'Available'],
['Build a tiny thing','Creation','Create a small useful artifact: a page, sketch, script, or prototype.','Hard',150,'Available'],
['Connect intentionally','Social','Send a thoughtful message or have a focused conversation with someone important.','Easy',45,'Completed'],
['Money clarity check','Finance','Review recent spending and choose one intentional improvement.','Medium',70,'Available'],
['Reset your environment','Environment','Clear your desk or digital workspace so the next task is easier to start.','Easy',30,'Available']
];
const count=await Quest.countDocuments({userId:user._id});
if(!count) await Quest.insertMany(samples.map(([title,category,description,difficulty,xp,status])=>({title,category,description,difficulty,xp,status,userId:user._id})));
console.log('Seed ready. Demo login: professor@lifeos.demo / LifeOSDemo2026!');
await mongoose.disconnect();
