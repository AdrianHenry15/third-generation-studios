export const isAdmin = (email: string): boolean => {
    const adminEmails = ["adrianhenry2115@gmail.com", "ahenry@thirdgenerationstudios.com"];

    return adminEmails.includes(email);
};
