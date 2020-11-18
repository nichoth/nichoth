# development diary

#dev-diary 

Have been thinking about git/merkle-dags/ssb today. I was wondering *does git sign commits?* I know that is the premise behind ssb, everything is signed and also a merkle-tree. I found this fantastic article about it: https://withblue.ink/2020/05/17/how-and-why-to-sign-git-commits.html .

So no, by default git does not sign anything, it just creates a merkle-dag, where every commit is a hash containing the previous commit (i think).

I think this train of thought started by thinking about more general ways of doing ssb. The technology is pretty generic after all -- hash functions used in a particular way. It's kind of a shame that it feels so tied to a particular implementation. I guess the database/user-id and replication are kind of coupled at the moment.

Anyway in the article they mention something called [gpg](https://gnupg.org/), which I think is a general unix way of doing digital signatures (like we have in ssb).

It makes me wonder about having a ssb client where you can choose an identity, like using your gpg credentials, or metamask or something. Digital signatures have gotten more attention because of bitcoins maybe. 


