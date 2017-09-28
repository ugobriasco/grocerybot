const List = require('./list.model');
const User = require('../user/user.model');


//Create a new list
exports.postList = (req, res) => {
	const list = new List();

	let message = 'list created';

	req.body.ownerID 
	? list.ownerID = req.body.ownerID
	: res.status(400).send({message: 'no ownerID defined'});

	req.body.data 
	? list.items.push(req.body.data) 
	: message = 'empty list created';

	list.save(function(err){
		if(err) res.status(500).send(err);
		res.json({message: message, data: list});
	});
}

// get a list given its _id
exports.getList = (req, res) => {
	List.findById(req.params.objID, function(list, err){
		if(err) res.status(500).send(err);
		res.json({data: list});
	})
}

//query all list saved (admin function)
exports.getAllLists = (req, res) => {
	List.find(function(err, lists){
		if(err) res.status(500).send(err);
		res.json({data: lists});
	});
}

//deleta a given list
exports.deleteList = (req, res) => {
	List.findByIdAndRemove(req.params.objID, function(err){
		if(err) res.status(500).send(err);
		res.json({message: 'List '+req.params.objID+' removed'})
	});
}

//update the items in a list
exports.replaceListItems = (req, res) => {
	List.findById(req.params.objID,(err, list) => {
		if(err) res.status(500).send(err);
		if(!list) res.status(404).send({message: 'No list found'});
		list.items.splice(0,list.items.length, req.body);
		Object.assign(list, req.body.data).save((err, list) => {
			if(err) res.status(500).send(err);
			res.json({ message: 'List updated!', list });
		});
	});
}

// //share a list 
	// exports.shareList = (req, res) => {

	// 	List.findById(req.params.objID,(err, list) => {
	// 		if(err) res.status(404).send(err);
	// 		if(!list) res.status(404).send({message: 'No list found'});
	// 		if(!req.body.userID) res.status(422).send({message: 'No userID provided'});
	// 		//if(!req.body.userID.match(/^[0-9a-fA-F]{24}$/)) res.status(422).send({message: 'No user founf'});

			

	// 		// User.findById(req.body.userID, (err, res, next) =>{
	// 		// 	if(err) res.status(404).send(err);
	// 		// 	else list.allowedUsers.push(res._id);
	// 		// 	next();
	// 		// });

	// 		list.allowedUsers.push(req.body.userID);


	// 		Object.assign(list, req.body).save((err, list) => {
	// 			if(err) res.send(err);
	// 			res.json({ message: 'List updated!', list });
	// 		});

	// 	});
	// }

// exports.unshareList = (req, res) => {
	
// }

