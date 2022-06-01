const { MongoClient } = require("mongodb");

describe("insert-delete", () => {
	let connection;
	let db;

	beforeAll(async () => {
		connection = await MongoClient.connect(
			"mongodb+srv://heidi:tenisdeva@doggymatch.32omz.mongodb.net/DoggyMatch?retryWrites=true&w=majority",
			{
				useNewUrlParser: true,
				useUnifiedTopology: true,
			}
		);
		db = await connection.db("DoggyMatch");
	});

	afterAll(async () => {
		await connection.close();
	});

	it("should insert a dog into collection", async () => {

		const dogs = db.collection("users");

		const mockDog = { _id: "some-id", dogName: "Charlie" };

		await dogs.insertOne(mockDog);

		const insertedDog = await dogs.findOne({ _id: "some-id" });

		expect(insertedDog).toEqual(mockDog);
	});

    it("should update a dog name into collection", async () => {

		const dogs = db.collection("users");

		await dogs.update({_id: "some-id"}, {$set: {"dogName": "Snow"}});

		const updatedDog = await dogs.findOne({ _id: "some-id" });

		expect(updatedDog).toEqual({ _id: "some-id", dogName: "Snow" });
	});

	it("should delete a dog from collection", async () => {

		const dogs = db.collection("users");

		const mockDog = { _id: "some-id" };

		await dogs.deleteOne(mockDog);

		const deletedDog = await dogs.findOne({ _id: "some-id" });

		expect(deletedDog).toEqual(null);
	});
});
