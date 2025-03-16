import React from 'react';
import Navbar from './components/Navbar';
import ParentSection from './components/ParentSection';
import 'katex/dist/katex.min.css';

function App() {
  const parentSections = [
    {
      id: 'single-step-unet',
      title: 'Single Step Denoising UNet',
      sections: [
        {
          id: 'architecture',
          title: 'Architecture',
          content: [
            {
              type: 'paragraph',
              text: 'The Single Step Denoising UNet is designed to estimate and remove noise from images in a single reverse step. The model uses the following UNet architecture.'
            },
            {
              type: 'image-grid',
              columns: 1,
              images: [
                { title: 'UNet Architecture', imageUrl: `${process.env.PUBLIC_URL}/images/unet.png` },
              ]
            },
            {
              type: 'image-grid',
              columns: 1,
              images: [
                { title: 'UNet Blocks', imageUrl: `${process.env.PUBLIC_URL}/images/blocks.png` },
              ]
            },
          ],
        },
        {
          id: 'training',
          title: 'Training',
          content: [
            {
              type: 'paragraph',
              text: 'To train the UNet as a single-step denoiser, we first add noise to the clean image. Specifically, we use a noise level of  = 0.5. The noisy image z is generated from the clean image x using the following formula:'
            },
            {
              type: 'math',
              text: '\\( z = x + \\sigma \\epsilon \\), where \\( \\epsilon \\sim \\mathcal{N}(0, I) \\)'
            },
            {
              type: 'image-grid',
              columns: 1,
              images: [
                { title: 'Noised Images for different sigma', imageUrl: `${process.env.PUBLIC_URL}/images/noising_process_visualization.jpg` },
              ]
            },
            {
              type: 'paragraph',
              text: 'The UNet takes the noisy image z as input and attempts to reconstruct the original clean image x in a single step. The Loss function is the L2 loss between the reconstructed and original images, as follows:'
            },
            {
              type: 'math',
              text: '\\( \\mathcal{L} = \\mathbb{E}_{z, x} \\| D_{\\theta}(z) - x \\|^2 \\)'
            },
            {
              type: 'paragraph',
              text: 'We train the model on the MNIST dataset using a batch size of 256 and a hidden dimension of D = 128. The optimizer is Adam with a learning rate of 10e-4, and the model is trained for 5 epochs. Here is the training loss curve:'
            },
            {
              type: 'image-grid',
              columns: 1,
              images: [
                { title: 'Loss per step (log scale)', imageUrl: `${process.env.PUBLIC_URL}/images/training_loss_curve_step_log.png` },
              ]
            },
          ]
        },
        {
          id: 'sampling',
          title: 'Sampling',
          content: [
            {
              type: 'paragraph',
              text: 'Here are the the results on digits of the test set after Epoch 1 and Epoch 5. The images in the test set are noised with sigma = 0.5 before being passed into the model.'
            },
            {
              type: 'image-grid',
              columns: 1,
              images: [
                { title: 'Epoch 1', imageUrl: `${process.env.PUBLIC_URL}/images/epoch1.png` },
              ]
            },
            {
              type: 'image-grid',
              columns: 1,
              images: [
                { title: 'Epoch 5', imageUrl: `${process.env.PUBLIC_URL}/images/epoch5.png` },
              ]
            },
            {
              type: 'paragraph',
              text: 'Our model is trained to denoise the digits which are noised with sigma = 0.5. Here, we test how well our model (after Epoch 5) can reconstruct images for different sigma values:'
            },
            {
              type: 'image-grid',
              columns: 1,
              images: [
                { title: 'Out of distribution testing', imageUrl: `${process.env.PUBLIC_URL}/images/out_of_distribution_samples.jpg` },
              ]
            },
          ],
        },
        {
          id: 'starting_from_pure_noise',
          title: 'Starting From Pure Noise',
          content: [
            {
              type: 'paragraph',
              text: 'We now attempt to train the model, replacing z with pure noise instead of a noised version of x. In this setting, the model is trained to map pure noise to the clean image. However, since the input noise z is independent of the target image x, the model has no information to infer the specific details of x and, in an MSE sense, the optimal solution is to output a constant value – namely, the mean of the training images.'
            },
            {
              type: 'math',
              text: '\\( \\mathcal{L}(D) = \\mathbb{E}_{z,x} \\Bigl[ \\| D(z) - x \\|^2 \\Bigr] \\)'
            },
            {
              type: 'paragraph',
              text: 'Here, D(z) is the denoiser and z is drawn from a fixed standard gaussian distribution independent of x. Because z carries no information about x, the best the model can do is output the same constant c for all z. Thus, we set:'
            },
            {
              type: 'math',
              text: '\\( D(z) = c \\quad \\text{for all } z \\)'
            },
            {
              type: 'paragraph',
              text: 'Substituting this constant predictor into the loss gives:'
            },
            {
              type: 'math',
              text: '\\( \\mathcal{L}(c) = \\mathbb{E}_{x} \\Bigl[ \\| c - x \\|^2 \\Bigr] \\)'
            },
            {
              type: 'paragraph',
              text: 'To find the optimal constant c, we differentiate with respect to c:'
            },
            {
              type: 'math',
              text: '\\( \\frac{d}{dc} \\mathcal{L}(c) = 2\\Bigl(c - \\mathbb{E}[x]\\Bigr) = 0 \\quad \\Rightarrow \\quad c = \\mathbb{E}[x] \\)'
            },
            {
              type: 'paragraph',
              text: 'Thus, if the input noise is independent of x, the MSE-optimal denoiser is simply to output the mean of the clean images. This explains why, in one-step denoising from pure noise, the model learns to predict the mean of the test set.'
            },
            {
              type: 'image-grid',
              columns: 1,
              images: [
                {
                  title: 'Epoch 1',
                  imageUrl: `${process.env.PUBLIC_URL}/images/pure_noise_denoising_epoch_1.jpg`
                },
              ]
            },
            {
              type: 'image-grid',
              columns: 1,
              images: [
                {
                  title: 'Epoch 1',
                  imageUrl: `${process.env.PUBLIC_URL}/images/pure_noise_denoising_epoch_5.jpg`
                },
              ]
            },
            {
              type: 'image-grid',
              columns: 1,
              images: [
                {
                  title: 'Epoch 1',
                  imageUrl: `${process.env.PUBLIC_URL}/images/average_image.png`
                },
              ]
            },
          ]
        },
      ],
    },
    {
      id: 'fm-model',
      title: 'Flow Matching Model',
      sections: [
        {
          id: 'optimal-transport-fm',
          title: 'Optimal Transport Flow Matching',
          content: [
            {
              type: 'paragraph',
              text: '1) We aim to generate images from the MNIST dataset, whose distribution we denote as q(x). We start with a simple base distribution p_0(x), a standard Gaussian, and assume there is a continuous probability path from p_0 to p_1 such that p_1 approximates q(x).'
            },
            {
              type: 'paragraph',
              text: '2) For each clean image x1 drawn from q, we define a conditional probability path p_t(x|x_1). Along this path, we denote the ground-truth conditional velocity by u_t(x|x_1) and the marginal velocity by u_t(x). Our goal is to train a network to predict a velocity field v_(x_t,t) so that the Flow Matching loss L_FM is minimized. Minimizing L_FM is equivalent to minimizing the Conditional Flow Matching loss L_CFM.'
            },
            {
              type: 'math',
              text: '\\( L_{FM} = \\mathbb{E}_{x \\sim p_t(x),\\, t \\sim U(0,1)} \\Bigl[ \\| v_\\theta(x,t) - u_t(x) \\|^2 \\Bigr] \\)'
            },
            {
              type: 'math',
              text: '\\( L_{CFM} = \\mathbb{E}_{x_1 \\sim q(x),\\, t \\sim U(0,1),\\, x \\sim p_t(x|x_1)} \\Bigl[ \\| v_\\theta(x,t) - u_t(x|x_1) \\|^2 \\Bigr] \\)'
            },
            {
              type: 'paragraph',
              text: '3) When the conditional probability paths are chosen as Gaussian, we parameterize them as:'
            },
            {
              type: 'math',
              text: '\\( p_t(x|x_1) = \\mathcal{N}\\Bigl(x|\\mu_t(x_1), \\sigma_t(x_1)^2 I\\Bigr) \\)'
            },
            {
              type: 'paragraph',
              text: 'In this case, the conditional velocity field can be derived and written in closed form as:'
            },
            {
              type: 'math',
              text: '\\( u_t(x|x_1) = \\frac{\\sigma\'_t(x_1)}{\\sigma_t(x_1)}\\bigl(x - \\mu_t(x_1)\\bigr) + \\mu\'_t(x_1) \\)'
            },
            {
              type: 'paragraph',
              text: '4) In the Optimal Transport (OT) variant, we simplify the Gaussian conditional path by choosing:'
            },
            {
              type: 'math',
              text: '\\( \\mu_t(x) = t\\,x_1 \\quad \\text{and} \\quad \\sigma_t(x) = 1 - (1-\\sigma_{\\min})\\,t \\)'
            },
            {
              type: 'paragraph',
              text: 'With this choice, the interpolation between the base noise x0 and the clean image x1 is given by a straight line:'
            },
            {
              type: 'math',
              text: '\\( x_t = (1-t)x_0 + t\\,x_1 \\)'
            },
            {
              type: 'paragraph',
              text: 'Since x_t is a linear interpolation, its time derivative is:'
            },
            {
              type: 'math',
              text: '\\( \\frac{d}{dt} x_t = x_1 - x_0 \\)'
            },
            {
              type: 'paragraph',
              text: 'Thus, for the OT variant the optimal conditional velocity field is constant and given by:'
            },
            {
              type: 'math',
              text: '\\( u_t(x|x_1) = x_1 - x_0 \\)'
            },
            {
              type: 'paragraph',
              text: '5) Consequently, the Conditional Flow Matching loss for the Optimal Transport path becomes:'
            },
            {
              type: 'math',
              text: '\\( L_{CFM}^{OT} = \\mathbb{E}_{x_1, x_0, t} \\Bigl[ \\| v_\\theta\\bigl((1-t)x_0 + t x_1, t\\bigr) - (x_1 - x_0) \\|^2 \\Bigr] \\)'
            },
          ]
        },
      ]
    },
    {
      id: 'time-conditioned-fm',
      title: 'Time Conditioned FM Model',
      sections: [         
        {
          id: 'time_cond_architecture',
          title: 'Architecture',
          content: [
            {
              type: 'paragraph',
              text: 'The Flow Matching model extends the UNet architecture by conditioning the network on a continuous time parameter t.'
            },            
            {
              type: 'image-grid',
              columns: 1,
              images: [
                { title: 'Injecting time condition', imageUrl: `${process.env.PUBLIC_URL}/images/timeconditioned.png` },
              ]
            },
            {
              type: 'image-grid',
              columns: 1,
              images: [
                { title: 'FC Block', imageUrl: `${process.env.PUBLIC_URL}/images/fcblock.png` },
              ]
            },
            { type: 'paragraph', 
              text: 'To inject the timestep t into the model, we pass it through a fully connected block (FCBlock), which outputs a tensor of shape 2D by 1 by 1 or 1D by 1 by 1. This tensor is then added elementwise to the respective layer’s feature maps, which are broadcasted across the spatial dimensions to match the feature maps’s H and W.' 
            },
          ],
        },
        {
          id: 'time_cond_training',
          title: 'Training',
          content: [ 
            {
              type: 'paragraph',
              text: 'We train the model on the MNIST dataset using a batch size of 64 and a hidden dimension of D = 64. The optimizer is Adam with initial learning rate of 10e-2 and an exponential learning rate decay scheduler. The model is trained for 20 epochs. Here is the training loss curve:'
            },
            {
              type: 'image-grid',
              columns: 1,
              images: [
                { title: 'Loss per step (log scale)', imageUrl: `${process.env.PUBLIC_URL}/images/step_loss_curve.png` },
              ]
            },
          ],
        },        
        {
          id: 'time_cond_sampling',
          title: 'Sampling',
          content: [
            {
              type: 'paragraph',
              text: 'In Flow Matching, sampling starts from pure noise and uses Euler integration to transform this noise into a clean image. At each discrete time step, the model predicts a velocity field and the image is updated accordingly.'
            },
            {
              type: 'math',
              text: '\\( x_{t+\\Delta t} = x_t + \\Delta t \\cdot v_{\\theta}(x_t, t) \\)'
            },
            {
              type: 'paragraph',
              text: 'Here, x0 is drawn from a standard Gaussian distribution. The process is iterated from t = 0 to t = 1, yielding the final generated image.'
            },
            {
              type: 'image-grid',
              columns: 1,
              images: [
                { title: 'Flow Matching Outputs', imageUrl: `${process.env.PUBLIC_URL}/images/stacked_samples_with_labels.png` }
              ]
            }
          ]
        },           
      ],
    },
    {
      id: 'class-and-time-conditioned-fm',
      title: 'Class and Time Conditioned FM Model',
      sections: [
        {
          id: 'class_and_time_architecture',
          title: 'Architecture',
          content: [
            {
              type: 'paragraph',
              text: 'To inject The Class Conditioning, we first one-hot encode the class into a vector, and then pass it into a FC Block (similar to how we got the time embedding). Instead of using the output of the FC Block to shift the values of the layers they are injected into, we instead use the output here to scale the layers. We inject them at the same layers where we injected the time conditioning.'
            },
          ],
        },
        {
          id: 'class_and_time_training',
          title: 'Training',
          content: [
            {
              type: 'paragraph',
              text: 'The model is trained on a class-labeled dataset, where the input to the model consists of noised image, their corresponding class labels, and timestep t.'
            },
            {
              type: 'paragraph',
              text: 'We use Classifier-Free Guidance (CFG) during training. This is achieved by randomly dropping the class conditioning with a probability of 0.1. When the class conditioning is dropped, we replace the class embedding with a zero vector to represent a "null class." This ensures the model can perform both class-conditioned and unconditional generation effectively. Here is the training loss curve:'
            },
            {
              type: 'image-grid',
              columns: 1,
              images: [
                { title: 'Loss per step (log scale)', imageUrl: `${process.env.PUBLIC_URL}/images/loss_curve_log_scale.png` },
              ]
            },
          ],
        },
        {
          id: 'class_and_time_sampling',
          title: 'Sampling',
          content: [
            {
              type: 'paragraph',
              text: 'During sampling with classifier-free guidance in Flow Matching, both the time and class conditions are used. At each integration step, the model is evaluated twice: once with the full class condition to obtain the conditional velocity, and once with the class condition dropped (unconditional) to obtain the unconditional velocity. These predictions are then combined using a guidance scale of gamma = 5.0.'
            },
            {
              type: 'math',
              text: '\\( v_{guided} = v_{c} + \\gamma (v_{c} - v_{u}) \\)'
            },
            {
              type: 'paragraph',
              text: ' Here are some results for various Epochs.'
            },
            {
              type: 'image-grid',
              columns: 1,
              images: [
                { title: 'Epoch 1 Output', imageUrl: `${process.env.PUBLIC_URL}/images/epoch_1_sampling.gif` },
              ]
            },
            {
              type: 'image-grid',
              columns: 1,
              images: [
                { title: 'Epoch 5 Output', imageUrl: `${process.env.PUBLIC_URL}/images/epoch_5_sampling.gif` },
              ]
            },
            {
              type: 'image-grid',
              columns: 1,
              images: [
                { title: 'Epoch 10 Output', imageUrl: `${process.env.PUBLIC_URL}/images/epoch_10_sampling.gif` },
              ]
            },
          ],
        },        
      ],
    },
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-gray-300">
      {/* Navbar */}
      <Navbar parentSections={parentSections} />

      {/* Main Content */}
      <div className="flex-1 px-4 sm:px-2 lg:px-8 py-8 md:ml-64 w-full">
        <h1 className="text-3xl sm:text-2xl lg:text-4xl font-bold text-center mb-12 text-white">
          Flow Matching
        </h1>

        {/* Render Parent Sections */}
        {parentSections.map((parent) => (
          <ParentSection
            key={parent.id}
            id={parent.id}
            title={parent.title}
            sections={parent.sections}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
