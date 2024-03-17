const getAllPatients = async () => {
    try {
      const results = await new Promise((resolve, reject) => {
        db.query("SELECT * FROM Patients", (err, results) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(results);
        });
      });
      return results;
    } catch (err) {
      throw new Error(`Error fetching patients: ${err.message}`);
    }
  };
  