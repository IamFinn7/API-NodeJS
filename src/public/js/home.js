document.addEventListener("DOMContentLoaded", () => {
  const path = window.location.pathname;

  // Hàm để lấy danh sách người dùng
  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/v1/user");
      const data = await response.json();
      const tbody = document.querySelector("#userTable tbody");
      if (tbody) {
        tbody.innerHTML = (data.listUsers[0] || [])
          .map(
            ({ id, email, name, city }) =>
              `<tr>
                <td>${id}</td>
                <td>${name}</td>
                <td>${email}</td>
                <td>${city}</td>
                <td class="action-cell">
                  <a href="/edit/${id}" class="action-btn edit-btn">Edit</a>
                  <button class="action-btn delete-btn" data-id="${id}">Delete</button>
                </td>
              </tr>`
          )
          .join("");
      }
      const deleteButtons = document.querySelectorAll(".delete-btn");
      deleteButtons.forEach((button) => {
        button.addEventListener("click", async () => {
          const userID = button.getAttribute("data-id");
          await deleteUserByID(userID);
          fetchUsers(); // Sau khi xóa, làm mới danh sách người dùng
        });
      });
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Hàm để tạo người dùng mới
  const createUser = async (userData) => {
    try {
      const response = await fetch("http://localhost:8080/api/v1/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("User created:", data);

      // Chuyển hướng hoặc thông báo thành công
      window.location.href = "/"; // Chuyển hướng về trang home sau khi tạo thành công
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  // Hàm để lấy thông tin người dùng theo ID
  const fetchUserByID = async (userID) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/user/${userID}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      const user = data.infoUser[0]; // Giả sử thông tin người dùng nằm ở đây

      // Điền thông tin vào các trường input
      // document.querySelector("#id").value = user[0].id || "";
      document.querySelector("#name").value = user[0].name || "";
      document.querySelector("#email").value = user[0].email || "";
      document.querySelector("#city").value = user[0].city || "";
    } catch (error) {
      console.error("Error getting user:", error);
    }
  };

  const deleteUserByID = async (userID) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/user/${userID}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error("Error delete user:", error);
    }
  };

  // Xác định trang và gọi hàm tương ứng
  if (path === "/") {
    // Trang home.ejs
    fetchUsers();
  } else if (path === "/create") {
    // Trang create.ejs
    const form = document.querySelector("#createUserForm");
    if (form) {
      form.addEventListener("submit", (event) => {
        event.preventDefault(); // Nộp form mà không bị reload trang

        const userData = {
          email: document.querySelector("#email").value, // ID = "email"
          name: document.querySelector("#name").value,
          city: document.querySelector("#city").value,
        };

        createUser(userData);
      });
    }
  } else if (path.startsWith("/edit/")) {
    const userID = path.split("/")[2]; // Lấy ID người dùng từ URL
    fetchUserByID(userID);

    const form = document.querySelector("#editUserForm");
    if (form) {
      form.addEventListener("submit", async (event) => {
        event.preventDefault(); // Ngăn ngừa reload trang

        const userData = {
          id: document.querySelector("#id").value, // ID người dùng
          email: document.querySelector("#email").value,
          name: document.querySelector("#name").value,
          city: document.querySelector("#city").value,
        };

        try {
          const response = await fetch(
            `http://localhost:8080/api/v1/user/${userID}`,
            {
              method: "PUT", // Hoặc PATCH nếu API yêu cầu
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(userData),
            }
          );

          if (!response.ok) {
            throw new Error("Network response was not ok");
          }

          const data = await response.json();
          console.log("User updated:", data);

          // Chuyển hướng hoặc thông báo thành công
          window.location.href = "/"; // Chuyển hướng về trang home sau khi cập nhật thành công
        } catch (error) {
          console.error("Error updating user:", error);
        }
      });
    }
  }
});
