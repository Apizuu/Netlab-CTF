#include <stdio.h>
#include <string.h>

void find_matching_characters(const char *hash1, const char *hash2, char *matching_chars) {
    int len = strlen(hash1); 
    int i, j = 0;

    for (i = 0; i < len; i++) {
        if (hash1[i] == hash2[i]) {
            matching_chars[j++] = hash1[i];
        }
    }
    matching_chars[j] = '\0';  
}

int main() {
    char md5_file1[] = "b544432e19e68ff8ae574bc71dd87af5";
    char md5_file2[] = "0d78d5b2213026ceaef6a73357cfec9e";

    char sha1_file1[] = "5a145ea48203ccad0906f278c9db429717c84431";
    char sha1_file2[] = "4545f73d8c970d2e47c260093070e50558abf474";

    char sha256_file1[] = "e6216b398088712fad338f57f2f1b92ab33e2c80fa8ec0649643ae06da681b42";
    char sha256_file2[] = "22cdc686dc8cbf8b7cc6529a61db5779036bdecc6ec8945a4fff353e1e667520";

    char whirlpool_file1[] = "dbbee1990a809c9762dc962779081c68a7449111ac9f81dc21d335966ef03857520352b81437ce59f7a66702bf41a65213ffaa3e7b79a8badc90b7c51851f3b7";
    char whirlpool_file2[] = "0a30f30297ce3967f84af6bf68f5472c41dd9f11845ee7cc6b2d3b99fa01dfd711c963e458e7f1cfb7b1b9454af8f36fc763a88049730064d320a2af47202256";

    char md5_matching[33] = "";      
    char sha1_matching[41] = "";     
    char sha256_matching[65] = "";   
    char whirlpool_matching[129] = ""; 

    find_matching_characters(md5_file1, md5_file2, md5_matching);
    find_matching_characters(sha1_file1, sha1_file2, sha1_matching);
    find_matching_characters(sha256_file1, sha256_file2, sha256_matching);
    find_matching_characters(whirlpool_file1, whirlpool_file2, whirlpool_matching);

    printf("MD5 Matching Characters: %s\n", md5_matching);
    printf("SHA-1 Matching Characters: %s\n", sha1_matching);
    printf("SHA-256 Matching Characters: %s\n", sha256_matching);
    printf("Whirlpool Matching Characters: %s\n", whirlpool_matching);

    printf("\nFlag: NTLB{%s%s%s%s}\n", md5_matching, sha1_matching, sha256_matching, whirlpool_matching);
    return 0;
}
