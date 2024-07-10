const db = require("@web/index.js");

//get restaurant by page
const getRestaurantByPage = (req, res) => {
    let { page } = req.params;

    page = (parseInt(page) - 1) * 10;
    const sql = "SELECT * FROM restaurant WHERE deleted_at IS NULL LIMIT 10 OFFSET ?";
    
    db.query(sql, [page], (error, data) => {
        if (error) {
        console.error("Error executing query:", error);
        return res.status(500).json("Internal Server Error");
        } else {
        if (data.length > 0) {
            return res.status(200).json(data);
        } else {
            return res.status(404).json("Restaurante no encontrado");
        }
        }
    });
}

// get restaurant by user ID
const getRestaurantByUserId = (req, res) => {
    const { userId } = req.params;
    const sql = "SELECT * FROM restaurant WHERE user_id = ? AND deleted_at IS NULL";
    
    db.query(sql, [userId], (error, data) => {
        if (error) {
        console.error("Error executing query:", error);
        return res.status(500).json("Internal Server Error");
        } else {
        if (data.length > 0) {
            return res.status(200).json(data);
        } else {
            return res.status(404).json("Restaurante no encontrado");
        }
        }
    });
}

// get restaurant by custom filters
const getRestaurantByFilters = (req, res) => {
    const { filters } = req.body;
    let sql = "SELECT * FROM restaurant WHERE deleted_at IS NULL";
    const values = [];

    if (filters) {
        if (filters.rating) {
            sql += " AND rating >= ?";
            values.push(filters.rating);
        }
        if (filters.type) {
            sql += " AND type = ?";
            values.push(filters.type);
        }
        if (filters.age_restricted !== undefined) {
            sql += " AND age_restricted = ?";
            values.push(filters.age_restricted);
        }
        if (filters.name) {
            sql += " AND name LIKE ?";
            values.push(`%${filters.name}%`);
        }
    }

    db.query(sql, values, (error, data) => {
        if (error) {
            console.error("Error executing query:", error);
            return res.status(500).json("Internal Server Error");
        } else {
            if (filters && filters.capacity) {
                data = data.filter(restaurant => {
                    const capacityArray = JSON.parse(restaurant.capacity);
                    const totalCapacity = capacityArray.reduce((sum, table) => sum + (table.tableCapacity * table.tableCount), 0);
                    return totalCapacity >= filters.capacity;
                });
            }

            if (data.length > 0) {
                return res.status(200).json(data);
            } else {
                return res.status(404).json("Restaurante no encontrado");
            }
        }
    });
};

// get sorted restaurants by rating
const getRestaurantsByRating = (req, res) => {
    const sql = "SELECT * FROM restaurant WHERE deleted_at IS NULL ORDER BY rating DESC LIMIT 10";
    
    db.query(sql, (error, data) => {
        if (error) {
        console.error("Error executing query:", error);
        return res.status(500).json("Internal Server Error");
        } else {
        if (data.length > 0) {
            return res.status(200).json(data);
        } else {
            return res.status(404).json("Restaurante no encontrado");
        }
        }
    });

}


module.exports = { getRestaurantByPage, getRestaurantByUserId, getRestaurantByFilters, getRestaurantsByRating }