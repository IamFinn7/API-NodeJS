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
                  <form action="/delete/${id}" method="POST">
                    <button type="submit" class="action-btn delete-btn">
                      Delete
                    </button>
                  </form>
                </td>
              </tr>`
          )
          .join("");
      }
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

  // Xác định trang và gọi hàm tương ứng
  if (path === "/") {
    // Trang home.ejs
    fetchUsers();
  } else if (path === "/create") {
    // Trang create.ejs
    const form = document.querySelector("#createUserForm");
    if (form) {
      form.addEventListener("submit", (event) => {
        event.preventDefault(); //nộp form mà không bị load trang

        const userData = {
          email: document.querySelector("#email").value, //id = "email"
          name: document.querySelector("#name").value,
          city: document.querySelector("#city").value,
        };

        createUser(userData);
      });
    }
  }
});
