import torch
import torch.nn as nn

class NexusBrain(nn.Module):
    def __init__(self, input_size):
        super(NexusBrain, self).__init__()
        # ৩টি লেয়ারের একটি নিউরাল নেটওয়ার্ক (Deep Learning Architecture)
        self.layer1 = nn.Linear(input_size, 16)
        self.layer2 = nn.Linear(16, 8)
        self.output_layer = nn.Linear(8, 1)
        self.relu = nn.ReLU() # এ্যাকটিভেশন ফাংশন

    def forward(self, x):
        x = self.relu(self.layer1(x))
        x = self.relu(self.layer2(x))
        x = self.output_layer(x)
        return x