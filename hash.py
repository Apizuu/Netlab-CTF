import base64
from Crypto.Cipher import AES
from Crypto.Hash import SHA256
from Crypto import Random

# Data terenkripsi dalam format base64 dan password yang digunakan
encrypted_text = "J+YwI0VNy01S0hpnNZ8BKYkxD1TaA2dq"
password = "Patience"

# Fungsi untuk menghasilkan kunci AES dari password
def generate_key(password):
    # Menghasilkan hash SHA-256 dari password untuk digunakan sebagai kunci AES
    hasher = SHA256.new(password.encode('utf-8'))
    return hasher.digest()

# Dekode teks terenkripsi dari format Base64
ciphertext = base64.b64decode(encrypted_text)

# Gunakan 16 byte pertama sebagai IV (Initialization Vector) untuk CBC
iv = ciphertext[:16]
ciphertext = ciphertext[16:]

# Buat objek cipher AES menggunakan kunci dan IV
key = generate_key(password)
cipher = AES.new(key, AES.MODE_CBC, iv)

# Mendekripsi teks terenkripsi
try:
    decrypted_text = cipher.decrypt(ciphertext)
    # Hapus padding PKCS7 secara manual (jika padding benar)
    padding_length = decrypted_text[-1]
    if padding_length < 16:
        decrypted_text = decrypted_text[:-padding_length]
    print("Decrypted Text:", decrypted_text.decode('utf-8'))
except Exception as e:
    print("Error during decryption:", e)
