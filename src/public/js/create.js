document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:8080/api/v1/user")
    .then((response) => response.json())
    .then((data) => {
      const tbody = document.querySelector("#userTable tbody");
      tbody.innerHTML = (data.listUsers[0] || [])
        .map(
          ({ id, email, name, city }) => `
                          <tr>
                              <td>${id}</td>
                              <td>${email}</td>
                              <td>${name}</td>
                              <td>${city}</td>
                              <td class="action-cell">
                                <a href="" class="action-btn edit-btn">Edit</a>
                                <form action="" method="POST">
                                <input type="hidden" name="tempId" value="" />
                                <button type="submit" class="action-btn delete-btn">
                                  Delete
                                </button>
                                </form>
                              </td>
                          </tr>
                      `
        )
        .join("");
    })
    .catch(console.error);
});
